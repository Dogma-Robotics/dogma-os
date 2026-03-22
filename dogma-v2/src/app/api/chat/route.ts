import { NextRequest, NextResponse } from 'next/server'
import { resolveSession, canUseAgent, getAgentTier, logActivity } from '@/lib/auth'
import { AGENTS } from '@/lib/agents'
import { getSupabase } from '@/lib/auth'
const API_KEY = process.env.ANTHROPIC_API_KEY || ''
export async function POST(req: NextRequest) {
  try {
    const auth = await resolveSession()
    if (auth.ok === false) return NextResponse.json({ error: auth.error }, { status: auth.status })
    const ctx = auth.ctx
    const { message, agentId = 'coder', dataContext } = await req.json()
    if (message === undefined || message === '') return NextResponse.json({ error: 'Missing message' }, { status: 400 })
    const agent = AGENTS[agentId]
    if (agent === undefined) return NextResponse.json({ text: `Unknown agent: ${agentId}`, files: [], toolCalls: [] })
    if (canUseAgent(ctx, agentId) === false) return NextResponse.json({ text: 'Permission denied', files: [], toolCalls: [] })
    const domainCtx = dataContext || await buildCtx(ctx.organizationId)
    const sys = agent.soulPrompt + '\nCLOUD FALLBACK — no computer access. Reason + plan only. For execution: openclaw gateway run' + (domainCtx ? '\n--- DOGMA CONTEXT ---\n'+domainCtx : '')
    if (API_KEY === '') return NextResponse.json({ text: 'Set ANTHROPIC_API_KEY in Vercel env vars.', files: [], toolCalls: [] })
    const t0 = Date.now()
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST', headers:{'Content-Type':'application/json','x-api-key':API_KEY,'anthropic-version':'2023-06-01'},
      body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:4096, system:sys, messages:[{role:'user',content:`User: ${ctx.name} (${ctx.role})\n${message}`}], tools:[{type:'web_search_20250305',name:'web_search'}] }),
    })
    if (res.ok === false) { const e = await res.text().catch(()=>'?'); return NextResponse.json({ text:`API error ${res.status}: ${e.slice(0,200)}`, files:[], toolCalls:[] }) }
    const d = await res.json()
    const text = (d.content||[]).filter((b:any)=>b.type==='text').map((b:any)=>b.text).join('\n') || '(no response)'
    await logActivity(ctx, 'agent_chat', 'agent', agentId, { agent:agentId, duration_ms:Date.now()-t0, mode:'cloud-fallback' })
    return NextResponse.json({ text, files:[], toolCalls:[], model:d.model, gateway:{connected:false,mode:'cloud-fallback'}, agent:{id:agentId,name:agent.name,icon:agent.icon}, user:{name:ctx.name,role:ctx.role} })
  } catch (e:any) { return NextResponse.json({ text:`Error: ${e.message}`, files:[], toolCalls:[] }) }
}
export async function GET() {
  const auth = await resolveSession()
  if (auth.ok === false) return NextResponse.json({ error: auth.error })
  const ctx = auth.ctx
  const agents = Object.entries(AGENTS).map(([id,a])=>({id,name:a.name,icon:a.icon,color:a.color,category:a.category,description:a.description,tier:getAgentTier(id),canUse:canUseAgent(ctx,id),computerAccess:a.computerAccess}))
  return NextResponse.json({ agents, gateway:{connected:false}, user:{name:ctx.name,role:ctx.role} })
}
async function buildCtx(orgId:string):Promise<string> {
  const sb = getSupabase(); if (sb === null) return ''
  try {
    const [{data:ss},{data:tasks},{data:fin}] = await Promise.all([
      sb.from('subsystems').select('name,maturity_level,status').eq('organization_id',orgId),
      sb.from('tasks').select('title,status,priority').eq('organization_id',orgId).neq('status','done').limit(15),
      sb.from('finance_snapshots').select('burn_rate,runway_months').eq('organization_id',orgId).order('month',{ascending:false}).limit(1),
    ])
    const p=['DOGMA Robotics']
    if(ss && ss.length > 0) p.push('SS: '+ss.map((s:any)=>`${s.name}(${s.maturity_level}%)`).join(', '))
    if(tasks && tasks.length > 0) p.push('Tasks: '+tasks.map((t:any)=>`[${t.priority}]${t.title}`).join(', '))
    if(fin && fin[0]) p.push(`Fin: burn $${fin[0].burn_rate}/mo, runway ${fin[0].runway_months}mo`)
    return p.join('\n')
  } catch { return '' }
}
