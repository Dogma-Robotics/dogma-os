// ══════════════════════════════════════════════════════════════════
// DOGMA OS — Agent Chat Route (v2: auth + policy + commands)
// ══════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { resolveSession, canUseAgent, getAgentTier, getAgentToolAllowlist, logActivity, type SessionContext } from '@/lib/auth'
import { getConnections, getToken, SERVICES, storeFile } from '@/lib/services'
import { executeCommand } from '@/lib/commands'
import { AGENTS } from '@/lib/agents'

const API_KEY = process.env.ANTHROPIC_API_KEY || ''

// ══════════════════════════════════════════════════════════════════
// TOOL DEFINITIONS — filtered by agent tier
// ══════════════════════════════════════════════════════════════════

function getToolsForAgent(agentId: string): any[] {
  const tier = getAgentTier(agentId)
  const allowed = getAgentToolAllowlist(agentId, tier)
  const tools: any[] = []

  // File generation tools (all tiers)
  if (allowed.includes('generate_html_report')) {
    tools.push({
      name: 'generate_html_report',
      description: `Generate a richly styled HTML report. Use CSS classes: <table>, <span class="badge pass/fail/warn/info">, <div class="metric-grid"><div class="metric-card">, <div class="progress-bar"><div class="progress-fill" style="width:75%">, <div class="callout critical/success/info">, <div class="kpi-row"><div class="kpi">. Write detailed data-rich content.`,
      input_schema: { type: 'object' as const, properties: { title: { type: 'string' }, html_body: { type: 'string' } }, required: ['title', 'html_body'] },
    })
  }
  if (allowed.includes('generate_csv')) {
    tools.push({
      name: 'generate_csv',
      description: 'Generate CSV spreadsheet. Returns download URL.',
      input_schema: { type: 'object' as const, properties: { title: { type: 'string' }, headers: { type: 'array', items: { type: 'string' } }, rows: { type: 'array', items: { type: 'array', items: { type: 'string' } } } }, required: ['title', 'headers', 'rows'] },
    })
  }
  if (allowed.includes('generate_json')) {
    tools.push({
      name: 'generate_json',
      description: 'Generate JSON data file.',
      input_schema: { type: 'object' as const, properties: { title: { type: 'string' }, data: { type: 'object' } }, required: ['title', 'data'] },
    })
  }
  if (allowed.includes('generate_markdown')) {
    tools.push({
      name: 'generate_markdown',
      description: 'Generate Markdown document.',
      input_schema: { type: 'object' as const, properties: { title: { type: 'string' }, content: { type: 'string' } }, required: ['title', 'content'] },
    })
  }

  // Domain mutation tools (controlled + sensitive tiers only)
  if (allowed.includes('create_task')) {
    tools.push({
      name: 'create_task',
      description: 'Create a new task. Requires title, optional: description, priority (low/medium/high/critical), workspace, due_at.',
      input_schema: { type: 'object' as const, properties: { title: { type: 'string' }, description: { type: 'string' }, priority: { type: 'string' }, workspace: { type: 'string' }, due_at: { type: 'string' } }, required: ['title'] },
    })
  }
  if (allowed.includes('update_task_status')) {
    tools.push({
      name: 'update_task_status',
      description: 'Update task status. Statuses: todo, progress, blocked, done.',
      input_schema: { type: 'object' as const, properties: { task_id: { type: 'string' }, status: { type: 'string' } }, required: ['task_id', 'status'] },
    })
  }
  if (allowed.includes('append_note')) {
    tools.push({
      name: 'append_note',
      description: 'Add a note to any entity. entity_type: subsystem, task, pilot, investor, incident, experiment, fleet, milestone.',
      input_schema: { type: 'object' as const, properties: { entity_type: { type: 'string' }, entity_id: { type: 'string' }, body: { type: 'string' } }, required: ['entity_type', 'entity_id', 'body'] },
    })
  }
  if (allowed.includes('advance_pilot_stage')) {
    tools.push({
      name: 'advance_pilot_stage',
      description: 'Advance a pilot to the next stage in the pipeline.',
      input_schema: { type: 'object' as const, properties: { pilot_id: { type: 'string' } }, required: ['pilot_id'] },
    })
  }
  if (allowed.includes('update_incident_status')) {
    tools.push({
      name: 'update_incident_status',
      description: 'Update incident status: open, investigating, resolved.',
      input_schema: { type: 'object' as const, properties: { incident_id: { type: 'string' }, status: { type: 'string' } }, required: ['incident_id', 'status'] },
    })
  }

  return tools
}

// ══════════════════════════════════════════════════════════════════
// HTML TEMPLATE (premium DOGMA branding)
// ══════════════════════════════════════════════════════════════════

function buildHtmlReport(title: string, input: any): string {
  const body = input.html_body || input.html || input.body || input.content || input.text || ''
  const finalBody = body || `<div class="callout info">No content was provided. Raw input:<br><pre>${JSON.stringify(input, null, 2).replace(/</g, '&lt;')}</pre></div>`

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--gold:#C8A74B;--bg:#0A0A18;--bg2:#0E0E20;--bg3:#141428;--bd:#1A1A35;--tx:#E8E6E0;--tx2:#9994B0;--tx3:#5C5878;--green:#2D7A5D;--red:#8A3333;--amber:#A78530;--blue:#3A5A7A}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);line-height:1.7;min-height:100vh}
.container{max-width:960px;margin:0 auto;padding:48px 40px 60px}
.header{margin-bottom:40px;padding-bottom:24px;border-bottom:2px solid var(--gold)}.header h1{font-size:32px;font-weight:800;color:var(--gold);margin-bottom:8px}.header .meta{display:flex;align-items:center;gap:16px;font-size:13px;color:var(--tx2)}.header .logo{font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--gold);font-size:13px;letter-spacing:0.08em}
h2{font-size:22px;font-weight:700;color:var(--tx);margin:36px 0 16px;padding-left:14px;border-left:4px solid var(--gold)}h3{font-size:17px;font-weight:600;color:var(--gold);margin:24px 0 10px}p{margin:8px 0;font-size:15px}strong{color:var(--gold)}
table{width:100%;border-collapse:collapse;margin:16px 0 24px;font-size:14px}thead th{background:var(--bg3);color:var(--gold);padding:12px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;border-bottom:2px solid var(--gold)}tbody td{padding:10px 14px;border-bottom:1px solid var(--bd)}tbody tr:hover td{background:var(--bg2)}
.badge{display:inline-block;padding:3px 10px;border-radius:4px;font-size:11px;font-weight:700;text-transform:uppercase;font-family:'JetBrains Mono',monospace}.badge.pass,.badge.success,.badge.validated,.badge.done,.badge.resolved{background:rgba(45,122,93,0.15);color:#4ADE80;border:1px solid rgba(45,122,93,0.3)}.badge.fail,.badge.critical,.badge.blocked,.badge.high{background:rgba(138,51,51,0.15);color:#F87171;border:1px solid rgba(138,51,51,0.3)}.badge.warn,.badge.warning,.badge.medium,.badge.progress,.badge.testing{background:rgba(167,133,48,0.15);color:#FBBF24;border:1px solid rgba(167,133,48,0.3)}.badge.info,.badge.low,.badge.dev{background:rgba(58,90,122,0.15);color:#60A5FA;border:1px solid rgba(58,90,122,0.3)}
.metric-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin:16px 0 24px}.metric-card{background:var(--bg2);border:1px solid var(--bd);border-radius:8px;padding:20px;text-align:center}.metric-value{font-size:28px;font-weight:800;font-family:'JetBrains Mono',monospace}.metric-label{font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:0.08em;margin-top:4px}
.kpi-row{display:flex;gap:16px;margin:16px 0;flex-wrap:wrap}.kpi{flex:1;min-width:120px;background:var(--bg2);border:1px solid var(--bd);border-radius:8px;padding:16px;text-align:center}.kpi-val{display:block;font-size:24px;font-weight:800;font-family:'JetBrains Mono',monospace;color:var(--gold)}.kpi-label{display:block;font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:0.08em;margin-top:2px}
.card{background:var(--bg2);border:1px solid var(--bd);border-radius:8px;padding:20px;margin:12px 0}.card h3{margin:0 0 8px;font-size:15px}
.progress-bar{width:100%;height:24px;background:var(--bg3);border-radius:6px;overflow:hidden;margin:8px 0;border:1px solid var(--bd)}.progress-fill{height:100%;background:linear-gradient(90deg,var(--gold),#E8C84B);border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--bg);font-family:'JetBrains Mono',monospace}
.callout{padding:14px 18px;border-radius:6px;margin:16px 0;font-size:14px;border-left:4px solid}.callout.critical{background:rgba(138,51,51,0.08);border-color:var(--red);color:#F87171}.callout.success{background:rgba(45,122,93,0.08);border-color:var(--green);color:#4ADE80}.callout.info{background:rgba(58,90,122,0.08);border-color:var(--blue);color:#60A5FA}.callout.warning{background:rgba(167,133,48,0.08);border-color:var(--amber);color:#FBBF24}
ul,ol{margin:8px 0 16px 24px;font-size:14px}li{margin:6px 0}li::marker{color:var(--gold)}
code{background:var(--bg3);color:var(--gold);padding:2px 8px;border-radius:4px;font-size:13px;font-family:'JetBrains Mono',monospace}pre{background:var(--bg3);border:1px solid var(--bd);padding:20px;border-radius:8px;overflow-x:auto;margin:16px 0}pre code{background:none;padding:0;color:var(--tx)}
blockquote{border-left:4px solid var(--gold);padding:12px 20px;margin:16px 0;background:var(--bg2);border-radius:0 6px 6px 0;color:var(--tx2)}
hr{border:none;height:1px;background:var(--bd);margin:32px 0}
.footer{margin-top:48px;padding-top:20px;border-top:1px solid var(--bd);text-align:center;font-size:11px;color:var(--tx3)}
@media print{body{background:#fff;color:#1a1a2e}h1,h3,.badge,.kpi-val,.metric-value,strong{color:#1a1a2e!important}}
</style></head>
<body><div class="container">
<div class="header"><h1>${title}</h1><div class="meta"><span class="logo">DOGMA ROBOTICS</span><span>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div></div>
${finalBody}
<div class="footer">DOGMA Robotics — Confidential — ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC</div>
</div></body></html>`
}

// ══════════════════════════════════════════════════════════════════
// TOOL EXECUTION (files + domain commands)
// ══════════════════════════════════════════════════════════════════

async function execTool(ctx: SessionContext, name: string, input: any): Promise<{ result: string; fileUrl?: string; fileName?: string; mutation?: any }> {
  // File generation tools
  if (name === 'generate_html_report') {
    const html = buildHtmlReport(input.title, input)
    const fn = input.title.replace(/[^a-zA-Z0-9]/g, '_') + '.html'
    const { url } = storeFile(ctx.organizationId, 'internal', fn, html, 'text/html')
    return { result: `Report: ${fn}`, fileUrl: url, fileName: fn }
  }
  if (name === 'generate_csv') {
    const csv = '\uFEFF' + input.headers.join(',') + '\n' + input.rows.map((r: string[]) => r.map((c: string) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const fn = input.title.replace(/[^a-zA-Z0-9]/g, '_') + '.csv'
    const { url } = storeFile(ctx.organizationId, 'internal', fn, csv, 'text/csv')
    return { result: `CSV: ${fn}`, fileUrl: url, fileName: fn }
  }
  if (name === 'generate_json') {
    const fn = input.title.replace(/[^a-zA-Z0-9]/g, '_') + '.json'
    const { url } = storeFile(ctx.organizationId, 'internal', fn, JSON.stringify(input.data, null, 2), 'application/json')
    return { result: `JSON: ${fn}`, fileUrl: url, fileName: fn }
  }
  if (name === 'generate_markdown') {
    const md = `# ${input.title}\n\n_DOGMA Robotics — ${new Date().toLocaleDateString()}_\n\n---\n\n${input.content}`
    const fn = input.title.replace(/[^a-zA-Z0-9]/g, '_') + '.md'
    const { url } = storeFile(ctx.organizationId, 'internal', fn, md, 'text/markdown')
    return { result: `Markdown: ${fn}`, fileUrl: url, fileName: fn }
  }

  // Domain commands (validated, audited)
  const cmdResult = await executeCommand(ctx, name, input)
  if (cmdResult.ok) {
    return { result: cmdResult.message, mutation: cmdResult.mutation }
  }
  return { result: `❌ ${cmdResult.message}` }
}

// ══════════════════════════════════════════════════════════════════
// MAIN HANDLER
// ══════════════════════════════════════════════════════════════════

export async function POST(req: NextRequest) {
  try {
    // 1. Auth
    const auth = await resolveSession()
    if (!auth.ok) return NextResponse.json({ text: `❌ ${auth.error}`, files: [], mutations: [], mcpConnected: [] })
    const ctx = auth.ctx

    const { message, agentId, dataContext } = await req.json()

    if (!API_KEY) return NextResponse.json({ text: '❌ ANTHROPIC_API_KEY not set', files: [], mutations: [], mcpConnected: [] })

    // 2. Agent permission check
    const agent = AGENTS[agentId]
    if (!agent) return NextResponse.json({ text: `Unknown agent: ${agentId}`, files: [], mutations: [], mcpConnected: [] })

    if (!canUseAgent(ctx, agentId)) {
      return NextResponse.json({ text: `❌ Permission denied: your role (${ctx.role}) cannot use agent ${agent.name}`, files: [], mutations: [], mcpConnected: [] })
    }

    // 3. Build tools (filtered by agent tier)
    const agentTools = getToolsForAgent(agentId)

    // 4. Build MCP servers (org-scoped)
    const mcpServers: any[] = []
    const connectedServices: string[] = []
    try {
      const connections = await getConnections(ctx.organizationId, ctx.userId)
      for (const conn of connections) {
        const svc = SERVICES[conn.service]
        if (svc?.mcp_url) {
          const token = await getToken(ctx.organizationId, ctx.userId, conn.service)
          if (token) {
            mcpServers.push({ type: 'url', url: svc.mcp_url, name: conn.service, authorization_token: token })
            connectedServices.push(svc.name)
          }
        }
      }
    } catch {}

    // 5. Build conversation
    const tier = getAgentTier(agentId)
    const policyNote = tier === 'readonly'
      ? '\nPOLICY: You are in READ-ONLY mode. You can generate reports and search the web, but you CANNOT create tasks, update statuses, or make any mutations.'
      : tier === 'controlled'
        ? '\nPOLICY: You can create tasks, update statuses, and add notes. All mutations are logged and audited.'
        : '\nPOLICY: You have elevated access. All actions are audited. Use with care.'

    const messages: any[] = [{
      role: 'user',
      content: `${agent.sys}${policyNote}\n\n--- COMPANY DATA ---\n${dataContext || '(none)'}\nUser: ${ctx.name} (${ctx.role})\nDate: ${new Date().toLocaleDateString()}\n\nUser: ${message}`,
    }]

    const allText: string[] = []
    const allFiles: { name: string; url: string; type: string }[] = []
    const allMutations: any[] = []
    let loopCount = 0
    const startTime = Date.now()

    while (loopCount < 8) {
      loopCount++

      const tools: any[] = [...agentTools, { type: 'web_search_20250305', name: 'web_search' }]
      const body: any = { model: 'claude-sonnet-4-20250514', max_tokens: 4096, messages, tools }
      if (mcpServers.length > 0) body.mcp_servers = mcpServers

      const rawRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify(body),
      })

      if (!rawRes.ok) {
        const err = await rawRes.text().catch(() => 'unknown')
        allText.push(`❌ API Error (${rawRes.status}): ${err.slice(0, 300)}`)
        break
      }

      const response = await rawRes.json()
      if (response.error) { allText.push('❌ ' + (response.error.message || JSON.stringify(response.error))); break }

      const toolResults: any[] = []

      for (const block of (response.content || [])) {
        if (block.type === 'text') allText.push(block.text)
        if (block.type === 'server_tool_use' || block.type === 'web_search_tool_result') continue
        if (block.type === 'tool_use') {
          const { result, fileUrl, fileName, mutation } = await execTool(ctx, block.name, block.input)
          allText.push(`✅ ${result}`)
          if (fileUrl && fileName) allFiles.push({ name: fileName, url: fileUrl, type: fileName.split('.').pop() || 'file' })
          if (mutation) allMutations.push(mutation)
          toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: fileUrl ? `${result}\nDownload: ${fileUrl}` : result })
        }
      }

      if (response.stop_reason === 'tool_use' && toolResults.length > 0) {
        messages.push({ role: 'assistant', content: response.content })
        messages.push({ role: 'user', content: toolResults })
        continue
      }
      break
    }

    // 6. Log agent run
    await logActivity(ctx, 'agent_chat', 'agent', agentId, {
      agent: agentId,
      tier,
      message: message.slice(0, 100),
      files: allFiles.length,
      mutations: allMutations.length,
      duration_ms: Date.now() - startTime,
    })

    return NextResponse.json({
      text: allText.join('\n') || '(no response)',
      files: allFiles,
      mutations: allMutations,
      mcpConnected: connectedServices,
      agent: { id: agentId, name: agent.name, tier },
      user: { name: ctx.name, role: ctx.role },
    })
  } catch (e: any) {
    console.log('CHAT ERROR:', e.message)
    return NextResponse.json({ text: `❌ ${e.message}`, files: [], mutations: [], mcpConnected: [] })
  }
}

export async function GET() {
  const auth = await resolveSession()
  if (!auth.ok) return NextResponse.json({ error: auth.error })
  const ctx = auth.ctx

  const agents = Object.entries(AGENTS)
    .map(([id, a]) => ({ id, name: a.name, icon: a.icon, color: a.color, category: a.category, tier: getAgentTier(id), canUse: canUseAgent(ctx, id) }))

  return NextResponse.json({
    agents,
    user: { name: ctx.name, role: ctx.role },
    tools: getToolsForAgent('planner').map((t: any) => t.name).concat(['web_search']),
  })
}
