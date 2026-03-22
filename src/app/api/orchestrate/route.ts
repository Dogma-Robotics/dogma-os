import { NextRequest, NextResponse } from 'next/server'
import { resolveSession, hasPermission, logActivity } from '@/lib/auth'
import { AGENTS, WORKFLOWS, getAgentList, getWorkflowList } from '@/lib/agents'

const API_KEY = process.env.ANTHROPIC_API_KEY || ''

export async function POST(req: NextRequest) {
  try {
    const auth = await resolveSession()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
    const ctx = auth.ctx
    if (!hasPermission(ctx, 'agent:swarm.basic') && !hasPermission(ctx, 'agent:*'))
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 })

    const { workflow, agent, objective, dataContext, mode = 'advisory' } = await req.json()
    if (!objective) return NextResponse.json({ error: 'Missing objective' }, { status: 400 })
    if (!API_KEY) return NextResponse.json({ error: 'Set ANTHROPIC_API_KEY' })

    // Single agent mode
    if (agent) {
      const a = AGENTS[agent]
      if (!a) return NextResponse.json({ error: 'Unknown agent: ' + agent })
      const out = await callClaude(a.soulPrompt, objective, dataContext || '', mode)
      return NextResponse.json({ type: 'single', agent: { id: agent, name: a.name, icon: a.icon, color: a.color }, output: out, files: [], mutations: [], mode })
    }

    // Workflow mode
    const wf = WORKFLOWS[workflow]
    if (!wf) return NextResponse.json({ error: 'Unknown workflow', available: Object.keys(WORKFLOWS) })

    const t0 = Date.now()
    const stageResults: any[] = []
    let accumulated = ''

    for (let i = 0; i < wf.stages.length; i++) {
      const stage = wf.stages[i]
      const outs: any[] = []

      for (const agentId of stage.agents) {
        const a = AGENTS[agentId]
        if (!a) continue
        const task = `[${wf.name} → ${stage.name}] ${objective}`
        const prompt = a.soulPrompt + (mode === 'advisory' ? '\nADVISORY MODE — analyze only.' : '\nEXECUTE MODE.') +
          '\n\n--- CONTEXT ---\n' + (dataContext || '') +
          (accumulated ? '\n\n--- PREVIOUS ---\n' + accumulated : '') +
          '\n\n--- TASK ---\n' + task
        const out = await callClaude(a.soulPrompt, prompt, dataContext || '', mode)
        outs.push({ id: agentId, name: a.name, icon: a.icon, color: a.color, output: out, files: [], mutations: [] })
        accumulated += '\n\n### ' + a.name + ':\n' + out
      }

      stageResults.push({ stage: i + 1, name: stage.name, strategy: stage.strategy, agents: outs })
    }

    // Coordinator summary
    const coordAgent = AGENTS['coordinator']
    const summary = coordAgent
      ? await callClaude(coordAgent.soulPrompt, 'Synthesize all outputs into 5-7 bullet executive summary:\n' + accumulated, dataContext || '', mode)
      : accumulated.slice(0, 500)

    await logActivity(ctx, 'swarm_run', 'workflow', workflow, {
      workflow, mode, objective: objective?.slice(0, 100),
      stages: stageResults.length, duration_ms: Date.now() - t0,
    })

    return NextResponse.json({
      type: 'swarm', workflow: wf.name, topology: wf.topology, objective, mode,
      stages: stageResults, summary, files: [], mutations: [],
      totalAgents: stageResults.reduce((acc: number, s: any) => acc + s.agents.length, 0),
      totalStages: stageResults.length,
      gateway: { connected: false, mode: 'cloud-fallback' },
      user: { name: ctx.name, role: ctx.role },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message })
  }
}

export async function GET() {
  return NextResponse.json({ agents: getAgentList(), workflows: getWorkflowList() })
}

async function callClaude(sysPrompt: string, message: string, context: string, mode: string): Promise<string> {
  const sys = sysPrompt + '\nCLOUD FALLBACK — no computer access.' + (context ? '\n--- DOGMA CONTEXT ---\n' + context : '')
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 4096, system: sys, messages: [{ role: 'user', content: message }] }),
    })
    if (!res.ok) return `API error: ${res.status}`
    const d = await res.json()
    return (d.content || []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n') || '(no response)'
  } catch (e: any) { return 'Error: ' + e.message }
}
