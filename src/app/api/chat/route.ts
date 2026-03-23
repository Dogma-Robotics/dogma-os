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
    const { message, agentId = 'coder', dataContext } = await req.json()
    if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 })

    const agent = AGENTS[agentId]
    if (!agent) return NextResponse.json({ text: 'Unknown agent: ' + agentId, files: [], toolCalls: [], gateway: { connected: false } })
    if (canUseAgent(ctx, agentId) === false) return NextResponse.json({ text: 'Permission denied', files: [], toolCalls: [], gateway: { connected: false } })

    const domainCtx = dataContext || await buildCtx(ctx.organizationId)
    const t0 = Date.now()

    // ── Try OpenClaw gateway first (server-to-server, no CORS) ──
    try {
      const sysMsg = agent.soulPrompt + '\nYou are a DOGMA Robotics AI agent. Be direct and useful.' + (domainCtx ? '\n--- DOGMA CONTEXT ---\n' + domainCtx : '')
      const ocRes = await fetch(OC_URL + '/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + OC_TOKEN,
          'x-openclaw-agent-id': 'main',
        },
        body: JSON.stringify({
          model: 'openclaw',
          messages: [
            { role: 'system', content: sysMsg },
            { role: 'user', content: 'User: ' + ctx.name + ' (' + ctx.role + ')\n' + message },
          ],
          user: 'dogma-' + ctx.userId,
        }),
        signal: AbortSignal.timeout(120000),
      })

      if (ocRes.ok) {
        const d = await ocRes.json()
        const text = d.choices?.[0]?.message?.content || '(no response)'

        await logActivity(ctx, 'agent_chat', 'agent', agentId, {
          agent: agentId, duration_ms: Date.now() - t0, mode: 'openclaw', model: d.model,
        })

        return NextResponse.json({
          text, files: [], toolCalls: [],
          model: d.model || 'openclaw',
          gateway: { connected: true, mode: 'openclaw' },
          agent: { id: agentId, name: agent.name, icon: agent.icon },
          user: { name: ctx.name, role: ctx.role },
        })
      }
    } catch (e) {
      // Gateway unreachable — fall through to Claude API
    }

    // ── Fallback: Direct Claude API ──
    if (API_KEY === '') {
      return NextResponse.json({
        text: 'Set ANTHROPIC_API_KEY in env vars, or start OpenClaw: openclaw gateway run',
        files: [], toolCalls: [], gateway: { connected: false },
      })
    }

    const sys = agent.soulPrompt + '\nYou are a DOGMA Robotics AI agent. Be direct and useful.' + (domainCtx ? '\n--- DOGMA CONTEXT ---\n' + domainCtx : '')

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514', max_tokens: 4096, system: sys,
        messages: [{ role: 'user', content: 'User: ' + ctx.name + ' (' + ctx.role + ')\n' + message }],
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      }),
    })

    if (res.ok === false) {
      const e = await res.text().catch(() => '?')
      return NextResponse.json({ text: 'API error ' + res.status + ': ' + e.slice(0, 200), files: [], toolCalls: [], gateway: { connected: false } })
    }

    const d = await res.json()
    const text = (d.content || []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n') || '(no response)'

    await logActivity(ctx, 'agent_chat', 'agent', agentId, {
      agent: agentId, duration_ms: Date.now() - t0, mode: 'cloud-fallback', model: d.model,
    })

    return NextResponse.json({
      text, files: [], toolCalls: [],
      model: d.model || 'claude-sonnet-4-20250514',
      gateway: { connected: false, mode: 'cloud-fallback' },
      agent: { id: agentId, name: agent.name, icon: agent.icon },
      user: { name: ctx.name, role: ctx.role },
    })
  } catch (e: any) {
    return NextResponse.json({ text: 'Error: ' + e.message, files: [], toolCalls: [], gateway: { connected: false } })
  }
}

export async function GET() {
  const auth = await resolveSession()
  if (auth.ok === false) return NextResponse.json({ error: auth.error })
  const ctx = auth.ctx

  // Check if OpenClaw is reachable
  let gwConnected = false
  try {
    const r = await fetch(OC_URL + '/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OC_TOKEN },
      body: JSON.stringify({ model: 'openclaw', messages: [{ role: 'user', content: 'ping' }], max_tokens: 1 }),
      signal: AbortSignal.timeout(3000),
    })
    gwConnected = r.ok
  } catch {}

  const agents = Object.entries(AGENTS).map(([id, a]) => ({
    id, name: a.name, icon: a.icon, color: a.color, category: a.category,
    description: a.description, tier: getAgentTier(id), canUse: canUseAgent(ctx, id),
    computerAccess: a.computerAccess,
  }))

  return NextResponse.json({
    agents,
    gateway: { connected: gwConnected, mode: gwConnected ? 'openclaw' : 'cloud-fallback' },
    user: { name: ctx.name, role: ctx.role },
  })
}

async function buildCtx(orgId: string): Promise<string> {
  const sb = getSupabase()
  if (sb === null) return ''
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
