#!/bin/bash
set -e
echo ""
echo "  🤖 DOGMA OS v2 — Installing..."
echo ""
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "  ❌ Run from /Users/jeronimoortiz/dogma-os"; exit 1
fi
mkdir -p src/hooks src/app/api/sessions

cat > src/hooks/useOpenClaw.ts << 'HOOKEOF'
'use client'
import { useState, useEffect, useCallback } from 'react'
const GW = 'http://localhost:18789'
export interface GatewayStatus { connected: boolean; version: string; model: string }
export interface ChatFile { name: string; url: string; type: string }
export interface ToolCall { tool: string; input: string; output?: string; status: string }
export interface ChatResponse { text: string; files: ChatFile[]; toolCalls: ToolCall[]; sessionId: string; model: string; via: 'gateway'|'vercel' }
export function useOpenClaw() {
  const [gateway, setGateway] = useState<GatewayStatus>({ connected: false, version: '', model: '' })
  const [toolLog, setToolLog] = useState<ToolCall[]>([])
  const [sessionId, setSessionId] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)
  const checkGateway = useCallback(async () => {
    try {
      const c = new AbortController(); const t = setTimeout(() => c.abort(), 2000)
      const r = await fetch(`${GW}/api/status`, { signal: c.signal, mode: 'cors' }); clearTimeout(t)
      if (r.ok) { const d = await r.json(); setGateway({ connected: true, version: d.version||'?', model: d.model||'sonnet' }); return }
    } catch {}
    setGateway(p => ({ ...p, connected: false }))
  }, [])
  useEffect(() => { checkGateway(); const iv = setInterval(checkGateway, 15000); return () => clearInterval(iv) }, [checkGateway])
  const sendMessage = useCallback(async (agentId: string, message: string, options: { dataContext?: string; mode?: string } = {}): Promise<ChatResponse> => {
    setLoading(true)
    try {
      if (gateway.connected) {
        try {
          const payload: any = { agent: agentId, message, model: 'claude-sonnet-4-20250514', max_tokens: 8192 }
          if (sessionId) payload.session = sessionId
          if (options.dataContext) payload.context = options.dataContext
          if (options.mode === 'advisory') payload.tool_policy = 'ask'
          const r = await fetch(`${GW}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), mode: 'cors' })
          if (!r.ok) throw new Error(`Gateway ${r.status}`)
          const d = await r.json()
          const result: ChatResponse = {
            text: d.text || d.reply || (d.content||[]).filter((b:any)=>b.type==='text').map((b:any)=>b.text).join('\n') || '',
            files: (d.files||[]).map((f:any)=>({ name: f.name, url: f.url||f.path, type: f.mime||'file' })),
            toolCalls: (d.tool_calls||[]).map((tc:any)=>({ tool: tc.tool||tc.name, input: typeof tc.input==='string'?tc.input:JSON.stringify(tc.input||{}).slice(0,120), output: tc.output?.slice(0,200), status: tc.status||'executed' })),
            sessionId: d.session_id||sessionId||'', model: d.model||'sonnet', via: 'gateway'
          }
          if (result.sessionId) setSessionId(result.sessionId)
          if (result.toolCalls.length > 0) setToolLog(p => [...result.toolCalls, ...p].slice(0, 100))
          setLoading(false); return result
        } catch (e) { console.warn('[OpenClaw] Gateway failed:', e); setGateway(p => ({ ...p, connected: false })) }
      }
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, agentId, dataContext: options.dataContext, mode: options.mode||'advisory' }) })
      const d = await r.json(); setLoading(false)
      return { text: d.text||'(no response)', files: (d.files||[]).map((f:any)=>({name:f.name,url:f.url,type:f.type||'file'})), toolCalls: (d.toolCalls||[]).map((tc:any)=>({tool:tc.tool,input:tc.input,output:tc.output,status:tc.status||'executed'})), sessionId: d.sessionId||'', model: d.model||'unknown', via: 'vercel' }
    } catch (e: any) { setLoading(false); return { text: `Error: ${e.message}`, files: [], toolCalls: [], sessionId: '', model: 'error', via: 'vercel' } }
  }, [gateway.connected, sessionId])
  const clearSession = useCallback(() => { setSessionId(null); setToolLog([]) }, [])
  return { gateway, toolLog, sessionId, loading, sendMessage, clearSession, checkGateway }
}
HOOKEOF
echo "  ✅ src/hooks/useOpenClaw.ts"

cat > src/lib/agents.ts << 'AGENTSEOF'
export interface AgentDef {
  id: string; name: string; icon: string; color: string
  category: 'strategy'|'implementation'|'quality'|'operations'
  description: string; soulPrompt: string; skills: string[]
  toolPolicy: 'ask'|'record'|'ignore'; allowedTools: string[]; deniedTools: string[]
  computerAccess: { shell: boolean; fileRead: boolean; fileWrite: boolean; browser: boolean; canvas: boolean; cron: boolean; network: boolean }
}
export const AGENTS: Record<string, AgentDef> = {
  planner: { id:'planner', name:'Planner', icon:'📐', color:'#C8A74B', category:'strategy', description:'Phased implementation blueprints', soulPrompt:'You are DOGMA Robotics senior planner. Create phased blueprints for a 27-DOF biomimetic robotic hand startup. Decompose into phases, tasks, dependencies, timeline, risks.', skills:['dogma-context'], toolPolicy:'record', allowedTools:['system.run','browser.*','file.*','web_search'], deniedTools:['system.run:rm -rf*'], computerAccess:{shell:true,fileRead:true,fileWrite:true,browser:true,canvas:true,cron:false,network:true} },
  architect: { id:'architect', name:'Architect', icon:'🏗️', color:'#3A5A7A', category:'strategy', description:'Technology decisions and system design', soulPrompt:'You are DOGMA Robotics systems architect. Define bounded contexts, data flows, ADRs. Every decision needs a rationale.', skills:['dogma-context'], toolPolicy:'record', allowedTools:['system.run','browser.*','file.*','web_search'], deniedTools:['system.run:rm -rf*'], computerAccess:{shell:true,fileRead:true,fileWrite:true,browser:true,canvas:true,cron:false,network:true} },
  researcher: { id:'researcher', name:'Researcher', icon:'🔍', color:'#3A7A7A', category:'strategy', description:'Deep research with real browser access', soulPrompt:'You are DOGMA Robotics research agent. ALWAYS search before recommending. Use browser for SOTA, papers, competitors.', skills:['dogma-context'], toolPolicy:'record', allowedTools:['browser.*','file.*','web_search'], deniedTools:['system.run:rm*'], computerAccess:{shell:true,fileRead:true,fileWrite:true,browser:true,canvas:false,cron:false,network:true} },
  coder: { id:'coder', name:'Coder', icon:'💻', color:'#2D7A5D', category:'implementation', description:'Full-stack dev with shell + browser on your machine', soulPrompt:'You are DOGMA Robotics senior full-stack dev with machine access. TDD: read code, write test, implement, run tests, refactor. TypeScript strict, no any.', skills:['dogma-context'], toolPolicy:'record', allowedTools:['system.run','file.*','browser.*','canvas.*'], deniedTools:[], computerAccess:{shell:true,fileRead:true,fileWrite:true,browser:true,canvas:true,cron:false,network:true} },
  'data-engineer': { id:'data-engineer', name:'Data Eng', icon:'🗄️', color:'#3A7A7A', category:'implementation', description:'Schemas, migrations, SQL', soulPrompt:'You are DOGMA Robotics data engineer. Design schemas, write migrations, optimize queries. Can run psql.', skills:['dogma-context'], toolPolicy:'ask', allowedTools:['system.run','file.*'], deniedTools:['system.run:DROP DATABASE*'], computerAccess:{shell:true,fileRead:true,fileWrite:true,browser:false,canvas:false,cron:false,network:true} },
  tester: { id:'tester', name:'Tester', icon:'🧪', color:'#8A3333', category:'quality', description:'Writes and runs tests on your machine', soulPrompt:'You are DOGMA Robotics QA. Write AND run tests. Never write tests without executing them.', skills:['dogma-context'], toolPolicy:'record', allowedTools:['system.run','file.*','browser.*'], deniedTools:[], computerAccess:{shell:true,fileRead:true,fileWrite:true,browser:true,canvas:false,cron:false,network:true} },
  reviewer: { id:'reviewer', name:'Reviewer', icon:'👁️', color:'#A78530', category:'quality', description:'Code review with codebase access (read-only)', soulPrompt:'You are DOGMA Robotics code reviewer. Read files, run linters, check types. Score: Architecture, Quality, Tests, Security (1-5 each).', skills:['dogma-context'], toolPolicy:'record', allowedTools:['system.run:cat*','system.run:grep*','system.run:find*','file.read*'], deniedTools:['file.write*'], computerAccess:{shell:true,fileRead:true,fileWrite:false,browser:false,canvas:false,cron:false,network:false} },
  'security-scanner': { id:'security-scanner', name:'Security', icon:'🔒', color:'#8A3333', category:'quality', description:'npm audit, secret scanning, vulnerability reports', soulPrompt:'You are DOGMA Robotics security engineer. Run npm audit, grep for secrets, review auth flows. CVSS-scored reports.', skills:['dogma-context'], toolPolicy:'ask', allowedTools:['system.run','file.read*','browser.*'], deniedTools:['file.write*'], computerAccess:{shell:true,fileRead:true,fileWrite:false,browser:true,canvas:false,cron:false,network:true} },
  documenter: { id:'documenter', name:'Documenter', icon:'📄', color:'#3A5A7A', category:'operations', description:'Polished HTML reports and docs as real files', soulPrompt:'You are DOGMA Robotics tech writer. Write files to disk: HTML, Markdown, CSV. DOGMA branding: navy bg, gold accents.', skills:['dogma-context'], toolPolicy:'record', allowedTools:['file.*','browser.*'], deniedTools:[], computerAccess:{shell:true,fileRead:true,fileWrite:true,browser:true,canvas:true,cron:false,network:false} },
  coordinator: { id:'coordinator', name:'Coordinator', icon:'🎯', color:'#C8A74B', category:'operations', description:'Synthesizes multi-agent outputs', soulPrompt:'You are the Swarm Coordinator. Read ALL agent outputs, resolve conflicts, 5-7 bullet executive summary. Never concatenate — synthesize.', skills:['dogma-context'], toolPolicy:'record', allowedTools:['file.*'], deniedTools:[], computerAccess:{shell:true,fileRead:true,fileWrite:true,browser:false,canvas:true,cron:false,network:false} },
  devops: { id:'devops', name:'DevOps', icon:'🚀', color:'#2D7A5D', category:'operations', description:'CI/CD, deployment, Docker', soulPrompt:'You are DOGMA Robotics DevOps. Manage deployments, Docker, CI/CD. Validate before applying. Rolling deploys.', skills:['dogma-context'], toolPolicy:'ask', allowedTools:['system.run','file.*'], deniedTools:[], computerAccess:{shell:true,fileRead:true,fileWrite:true,browser:false,canvas:false,cron:true,network:true} },
}
export const WORKFLOWS: Record<string, any> = {
  'build-feature': { id:'build-feature', name:'Build Feature', description:'Research → Plan → Code → Test → Review', topology:'pipeline', stages:[{name:'Plan',agents:['researcher','planner'],strategy:'sequential'},{name:'Build',agents:['coder'],strategy:'sequential'},{name:'Verify',agents:['tester','reviewer'],strategy:'parallel'},{name:'Ship',agents:['documenter'],strategy:'sequential'}] },
  'code-review': { id:'code-review', name:'Code Review', description:'Security + Quality → Synthesize', topology:'fan-out-fan-in', stages:[{name:'Analysis',agents:['security-scanner','reviewer','tester'],strategy:'parallel'},{name:'Synthesis',agents:['coordinator'],strategy:'sequential'}] },
  'research-sprint': { id:'research-sprint', name:'Research Sprint', description:'Research → Architect → Plan → Doc', topology:'pipeline', stages:[{name:'Research',agents:['researcher'],strategy:'sequential'},{name:'Analyze',agents:['architect'],strategy:'sequential'},{name:'Plan',agents:['planner'],strategy:'sequential'},{name:'Document',agents:['documenter'],strategy:'sequential'}] },
}
export function getAgentList() { return Object.values(AGENTS).map(a=>({id:a.id,name:a.name,icon:a.icon,color:a.color,category:a.category,description:a.description,computerAccess:a.computerAccess})) }
export function getWorkflowList() { return Object.values(WORKFLOWS).map((w:any)=>({...w,totalAgents:w.stages.reduce((a:number,s:any)=>a+s.agents.length,0)})) }
AGENTSEOF
echo "  ✅ src/lib/agents.ts"

cat > src/app/api/chat/route.ts << 'CHATEOF'
import { NextRequest, NextResponse } from 'next/server'
import { resolveSession, canUseAgent, getAgentTier, logActivity } from '@/lib/auth'
import { AGENTS } from '@/lib/agents'
import { getSupabase } from '@/lib/auth'
const API_KEY = process.env.ANTHROPIC_API_KEY || ''
export async function POST(req: NextRequest) {
  try {
    const auth = await resolveSession()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
    const ctx = auth.ctx
    const { message, agentId = 'coder', dataContext } = await req.json()
    if (!message) return NextResponse.json({ error: 'Missing message' }, { status: 400 })
    const agent = AGENTS[agentId]
    if (!agent) return NextResponse.json({ text: `Unknown agent: ${agentId}`, files: [], toolCalls: [] })
    if (!canUseAgent(ctx, agentId)) return NextResponse.json({ text: 'Permission denied', files: [], toolCalls: [] })
    const domainCtx = dataContext || await buildCtx(ctx.organizationId)
    const sys = agent.soulPrompt + '\nCLOUD FALLBACK — no computer access. Reason + plan only. For execution: openclaw gateway run' + (domainCtx ? '\n--- DOGMA CONTEXT ---\n'+domainCtx : '')
    if (!API_KEY) return NextResponse.json({ text: 'Set ANTHROPIC_API_KEY in Vercel env vars.', files: [], toolCalls: [] })
    const t0 = Date.now()
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST', headers:{'Content-Type':'application/json','x-api-key':API_KEY,'anthropic-version':'2023-06-01'},
      body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:4096, system:sys, messages:[{role:'user',content:`User: ${ctx.name} (${ctx.role})\n${message}`}], tools:[{type:'web_search_20250305',name:'web_search'}] }),
    })
    if (!res.ok) { const e = await res.text().catch(()=>'?'); return NextResponse.json({ text:`API error ${res.status}: ${e.slice(0,200)}`, files:[], toolCalls:[] }) }
    const d = await res.json()
    const text = (d.content||[]).filter((b:any)=>b.type==='text').map((b:any)=>b.text).join('\n') || '(no response)'
    await logActivity(ctx, 'agent_chat', 'agent', agentId, { agent:agentId, duration_ms:Date.now()-t0, mode:'cloud-fallback' })
    return NextResponse.json({ text, files:[], toolCalls:[], model:d.model, gateway:{connected:false,mode:'cloud-fallback'}, agent:{id:agentId,name:agent.name,icon:agent.icon}, user:{name:ctx.name,role:ctx.role} })
  } catch (e:any) { return NextResponse.json({ text:`Error: ${e.message}`, files:[], toolCalls:[] }) }
}
export async function GET() {
  const auth = await resolveSession(); if (!auth.ok) return NextResponse.json({ error: auth.error })
  const ctx = auth.ctx
  const agents = Object.entries(AGENTS).map(([id,a])=>({id,name:a.name,icon:a.icon,color:a.color,category:a.category,description:a.description,tier:getAgentTier(id),canUse:canUseAgent(ctx,id),computerAccess:a.computerAccess}))
  return NextResponse.json({ agents, gateway:{connected:false}, user:{name:ctx.name,role:ctx.role} })
}
async function buildCtx(orgId:string):Promise<string> {
  const sb = getSupabase(); if (!sb) return ''
  try {
    const [{data:ss},{data:tasks},{data:fin}] = await Promise.all([
      sb.from('subsystems').select('name,maturity_level,status').eq('organization_id',orgId),
      sb.from('tasks').select('title,status,priority').eq('organization_id',orgId).neq('status','done').limit(15),
      sb.from('finance_snapshots').select('burn_rate,runway_months').eq('organization_id',orgId).order('month',{ascending:false}).limit(1),
    ])
    const p=['DOGMA Robotics']
    if(ss?.length) p.push('SS: '+ss.map(s=>`${s.name}(${s.maturity_level}%)`).join(', '))
    if(tasks?.length) p.push('Tasks: '+tasks.map(t=>`[${t.priority}]${t.title}`).join(', '))
    if(fin?.[0]) p.push(`Fin: burn $${fin[0].burn_rate}/mo, runway ${fin[0].runway_months}mo`)
    return p.join('\n')
  } catch { return '' }
}
CHATEOF
echo "  ✅ src/app/api/chat/route.ts"

cat > src/app/api/sessions/route.ts << 'SESSEOF'
import { NextResponse } from 'next/server'
import { resolveSession } from '@/lib/auth'
export async function GET() {
  const auth = await resolveSession()
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  return NextResponse.json({ gateway: { connected: false }, sessions: [] })
}
SESSEOF
echo "  ✅ src/app/api/sessions/route.ts"

echo ""
echo "  ✅ 4 files created! Now run:"
echo ""
echo "    git add -A && git status"
echo ""
