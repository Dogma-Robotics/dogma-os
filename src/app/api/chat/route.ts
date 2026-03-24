import { NextRequest, NextResponse } from 'next/server'
import { resolveSession, canUseAgent, getAgentTier, logActivity } from '@/lib/auth'
import { AGENTS } from '@/lib/agents'
import { getSupabase } from '@/lib/auth'

const API_KEY = process.env.ANTHROPIC_API_KEY || ''
const OC_URL = 'http://127.0.0.1:18789'
const OC_TOKEN = process.env.OPENCLAW_TOKEN || 'c1b587d6e4015fcba76853c05e4004d8a2c3576c4eff3d0b'

export async function POST(req: NextRequest) {
  try {
    const auth = await resolveSession()
    if (auth.ok === false) return NextResponse.json({ error: auth.error }, { status: auth.status })
    const ctx = auth.ctx
    const { message, agentId = 'coder', dataContext, designGuide, showThinking, stream } = await req.json()
    if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 })

    const agent = AGENTS[agentId]
    if (!agent) return NextResponse.json({ text: 'Unknown agent: ' + agentId, files: [], toolCalls: [] })
    if (canUseAgent(ctx, agentId) === false) return NextResponse.json({ text: 'Permission denied', files: [], toolCalls: [] })

    const domainCtx = dataContext || await buildCtx(ctx.organizationId)
    const guideNote = designGuide ? '\n\nDESIGN GUIDELINES (use when generating documents):\n' + designGuide : ''
    const t0 = Date.now()

    // Build system prompt
    const sys = agent.soulPrompt + '\nYou are a DOGMA Robotics AI agent. You have full computer access via OpenClaw: shell, browser, files. Be direct and execute tasks.\n\nVM ACCESS: You have SSH access to an Ubuntu VM running ROS 2 Jazzy. To run commands on the VM, use: ssh vm "command"\nExamples:\n- ssh vm "ros2 topic list"\n- ssh vm "cd ~/ros2_ws && colcon build"' + guideNote + (domainCtx ? '\n--- DOGMA CONTEXT ---\n' + domainCtx : '')

    // ── STREAMING MODE ──
    if (stream) {
      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          function send(type: string, data: any) {
            controller.enqueue(encoder.encode('data: ' + JSON.stringify({ type, ...data }) + '\n\n'))
          }

          // Try OpenClaw first
          let used = 'cloud'
          try {
            const ocRes = await fetch(OC_URL + '/v1/chat/completions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OC_TOKEN, 'x-openclaw-agent-id': 'main' },
              body: JSON.stringify({ model: 'openclaw', stream: true, messages: [{ role: 'system', content: sys }, { role: 'user', content: 'User: ' + ctx.name + '\n' + message }], user: 'dogma-' + ctx.userId }),
              signal: AbortSignal.timeout(120000),
            })

            if (ocRes.ok && ocRes.body) {
              used = 'openclaw'
              const reader = ocRes.body.getReader()
              const decoder = new TextDecoder()
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split('\n')
                for (const line of lines) {
                  if (!line.startsWith('data: ')) continue
                  const payload = line.slice(6)
                  if (payload === '[DONE]') continue
                  try {
                    const ev = JSON.parse(payload)
                    const delta = ev.choices?.[0]?.delta
                    if (delta?.content) send('text', { text: delta.content })
                  } catch {}
                }
              }
              send('done', { text: '', gateway: { connected: true, mode: 'openclaw' } })
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              controller.close()
              await logActivity(ctx, 'agent_chat', 'agent', agentId, { agent: agentId, duration_ms: Date.now() - t0, mode: 'openclaw', stream: true })
              return
            }
          } catch {}

          // Fallback: Claude API streaming
          if (API_KEY === '') {
            send('done', { text: 'No OpenClaw gateway and no ANTHROPIC_API_KEY set.' })
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
            return
          }

          try {
            const body: any = {
              model: 'claude-sonnet-4-20250514', max_tokens: 4096, stream: true, system: sys,
              messages: [{ role: 'user', content: 'User: ' + ctx.name + ' (' + ctx.role + ')\n' + message }],
              tools: [{ type: 'web_search_20250305', name: 'web_search' }],
            }
            if (showThinking) {
              body.thinking = { type: 'enabled', budget_tokens: 2048 }
            }

            const res = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
              body: JSON.stringify(body),
            })

            if (res.ok && res.body) {
              const reader = res.body.getReader()
              const decoder = new TextDecoder()
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split('\n')
                for (const line of lines) {
                  if (!line.startsWith('data: ')) continue
                  const payload = line.slice(6)
                  if (payload === '[DONE]') continue
                  try {
                    const ev = JSON.parse(payload)
                    if (ev.type === 'content_block_delta') {
                      if (ev.delta?.type === 'thinking_delta') send('thinking', { text: ev.delta.thinking })
                      else if (ev.delta?.type === 'text_delta') send('text', { text: ev.delta.text })
                    }
                  } catch {}
                }
              }
            } else {
              const err = await res.text().catch(() => '?')
              send('text', { text: 'Error: ' + err.slice(0, 200) })
            }
          } catch (e: any) {
            send('text', { text: 'Error: ' + e.message })
          }

          send('done', { text: '', gateway: { connected: false, mode: 'cloud' } })
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
          await logActivity(ctx, 'agent_chat', 'agent', agentId, { agent: agentId, duration_ms: Date.now() - t0, mode: used, stream: true })
        }
      })

      return new Response(readable, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' }
      })
    }

    // ── NON-STREAMING MODE (backward compat) ──
    try {
      const sysMsg = sys
      const ocRes = await fetch(OC_URL + '/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OC_TOKEN, 'x-openclaw-agent-id': 'main' },
        body: JSON.stringify({ model: 'openclaw', messages: [{ role: 'system', content: sysMsg }, { role: 'user', content: 'User: ' + ctx.name + '\n' + message }], user: 'dogma-' + ctx.userId }),
        signal: AbortSignal.timeout(120000),
      })
      if (ocRes.ok) {
        const d = await ocRes.json()
        const text = d.choices?.[0]?.message?.content || '(no response)'
        await logActivity(ctx, 'agent_chat', 'agent', agentId, { agent: agentId, duration_ms: Date.now() - t0, mode: 'openclaw' })
        return NextResponse.json({ text, files: [], toolCalls: [], model: d.model || 'openclaw', gateway: { connected: true, mode: 'openclaw' }, agent: { id: agentId, name: agent.name, icon: agent.icon }, user: { name: ctx.name, role: ctx.role } })
      }
    } catch {}

    if (API_KEY === '') return NextResponse.json({ text: 'No API key set.', files: [], toolCalls: [], gateway: { connected: false } })
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 4096, system: sys, messages: [{ role: 'user', content: 'User: ' + ctx.name + ' (' + ctx.role + ')\n' + message }], tools: [{ type: 'web_search_20250305', name: 'web_search' }] }),
    })
    if (res.ok === false) { const e = await res.text().catch(() => '?'); return NextResponse.json({ text: 'Error: ' + e.slice(0, 200), files: [], toolCalls: [], gateway: { connected: false } }) }
    const d = await res.json()
    const text = (d.content || []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n') || '(no response)'
    await logActivity(ctx, 'agent_chat', 'agent', agentId, { agent: agentId, duration_ms: Date.now() - t0, mode: 'cloud' })
    return NextResponse.json({ text, files: [], toolCalls: [], model: d.model, gateway: { connected: false, mode: 'cloud' }, agent: { id: agentId, name: agent.name, icon: agent.icon }, user: { name: ctx.name, role: ctx.role } })
  } catch (e: any) { return NextResponse.json({ text: 'Error: ' + e.message, files: [], toolCalls: [], gateway: { connected: false } }) }
}

export async function GET() {
  const auth = await resolveSession()
  if (auth.ok === false) return NextResponse.json({ error: auth.error })
  const ctx = auth.ctx
  let gwConnected = false
  try { const r = await fetch(OC_URL + '/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OC_TOKEN }, body: JSON.stringify({ model: 'openclaw', messages: [{ role: 'user', content: 'ping' }], max_tokens: 1 }), signal: AbortSignal.timeout(3000) }); gwConnected = r.ok } catch {}
  const agents = Object.entries(AGENTS).map(([id, a]) => ({ id, name: a.name, icon: a.icon, color: a.color, category: a.category, description: a.description, tier: getAgentTier(id), canUse: canUseAgent(ctx, id), computerAccess: a.computerAccess }))
  return NextResponse.json({ agents, gateway: { connected: gwConnected, mode: gwConnected ? 'openclaw' : 'cloud' }, user: { name: ctx.name, role: ctx.role } })
}

async function buildCtx(orgId: string): Promise<string> {
  const sb = getSupabase(); if (sb === null) return ''
  try {
    const [{ data: ss }, { data: tasks }, { data: fin }] = await Promise.all([
      sb.from('subsystems').select('name,maturity_level,status').eq('organization_id', orgId),
      sb.from('tasks').select('title,status,priority').eq('organization_id', orgId).neq('status', 'done').limit(15),
      sb.from('finance_snapshots').select('burn_rate,runway_months').eq('organization_id', orgId).order('month', { ascending: false }).limit(1),
    ])
    const p = ['DOGMA Robotics']
    if (ss && ss.length > 0) p.push('SS: ' + ss.map((s: any) => s.name + '(' + s.maturity_level + '%)').join(', '))
    if (tasks && tasks.length > 0) p.push('Tasks: ' + tasks.map((t: any) => '[' + t.priority + ']' + t.title).join(', '))
    if (fin && fin[0]) p.push('Fin: burn $' + fin[0].burn_rate + '/mo, runway ' + fin[0].runway_months + 'mo')
    return p.join('\n')
  } catch { return '' }
}
