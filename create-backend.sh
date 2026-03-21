#!/bin/bash
# Run from inside your dogma-os project root:
#   chmod +x create-backend.sh && ./create-backend.sh

set -e
echo "🤖 Creating DOGMA OS backend files..."

# ── Directories ──
mkdir -p src/app/api/chat
mkdir -p src/app/api/connections/callback
mkdir -p src/app/settings
mkdir -p src/lib

# ══════════════════════════════════════════
# src/lib/services.ts
# ══════════════════════════════════════════
cat > src/lib/services.ts << 'SVCEOF'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export const SERVICES: Record<string, {
  name: string; icon: string; mcp_url: string;
  auth_url: string; token_url: string; scopes: string;
  client_id_env: string; client_secret_env: string;
}> = {
  canva: {
    name:'Canva', icon:'🎨', mcp_url:'https://mcp.canva.com/mcp',
    auth_url:'https://www.canva.com/api/oauth/authorize',
    token_url:'https://www.canva.com/api/oauth/token',
    scopes:'design:content:read design:content:write',
    client_id_env:'CANVA_CLIENT_ID', client_secret_env:'CANVA_CLIENT_SECRET',
  },
  miro: {
    name:'Miro', icon:'📋', mcp_url:'https://mcp.miro.com',
    auth_url:'https://miro.com/oauth/authorize',
    token_url:'https://api.miro.com/v1/oauth/token',
    scopes:'boards:read boards:write',
    client_id_env:'MIRO_CLIENT_ID', client_secret_env:'MIRO_CLIENT_SECRET',
  },
  figma: {
    name:'Figma', icon:'△', mcp_url:'https://mcp.figma.com/mcp',
    auth_url:'https://www.figma.com/oauth',
    token_url:'https://www.figma.com/api/oauth/token',
    scopes:'files:read',
    client_id_env:'FIGMA_CLIENT_ID', client_secret_env:'FIGMA_CLIENT_SECRET',
  },
  github: {
    name:'GitHub', icon:'🐙', mcp_url:'https://api.github.com',
    auth_url:'https://github.com/login/oauth/authorize',
    token_url:'https://github.com/login/oauth/access_token',
    scopes:'repo read:org',
    client_id_env:'GITHUB_CLIENT_ID', client_secret_env:'GITHUB_CLIENT_SECRET',
  },
  google: {
    name:'Google (Gmail+Calendar)', icon:'📧',
    mcp_url:'https://gmail.mcp.claude.com/mcp',
    auth_url:'https://accounts.google.com/o/oauth2/v2/auth',
    token_url:'https://oauth2.googleapis.com/token',
    scopes:'https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar',
    client_id_env:'GOOGLE_CLIENT_ID', client_secret_env:'GOOGLE_CLIENT_SECRET',
  },
  monday: {
    name:'Monday.com', icon:'📊', mcp_url:'https://mcp.monday.com/mcp',
    auth_url:'https://auth.monday.com/oauth2/authorize',
    token_url:'https://auth.monday.com/oauth2/token',
    scopes:'boards:read boards:write',
    client_id_env:'MONDAY_CLIENT_ID', client_secret_env:'MONDAY_CLIENT_SECRET',
  },
  vercel: {
    name:'Vercel', icon:'▲', mcp_url:'https://mcp.vercel.com',
    auth_url:'https://vercel.com/integrations/oauth',
    token_url:'https://api.vercel.com/v2/oauth/access_token',
    scopes:'read write',
    client_id_env:'VERCEL_CLIENT_ID', client_secret_env:'VERCEL_CLIENT_SECRET',
  },
}

export async function getToken(service: string): Promise<string | null> {
  const { data } = await supabase
    .from('connections')
    .select('access_token, refresh_token, token_expires_at')
    .eq('user_id', 'jero').eq('service', service).single()
  if (!data) return null
  if (data.token_expires_at && new Date(data.token_expires_at) < new Date()) {
    return await refreshToken(service, data.refresh_token)
  }
  return data.access_token
}

export async function storeToken(service: string, tokens: {
  access_token: string; refresh_token?: string; expires_in?: number; email?: string;
}) {
  const expires_at = tokens.expires_in
    ? new Date(Date.now() + tokens.expires_in * 1000).toISOString() : null
  await supabase.from('connections').upsert({
    user_id: 'jero', service,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token || null,
    token_expires_at: expires_at,
    service_email: tokens.email || null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,service' })
}

async function refreshToken(service: string, rt: string | null): Promise<string | null> {
  if (!rt) return null
  const svc = SERVICES[service]
  if (!svc) return null
  const resp = await fetch(svc.token_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token', refresh_token: rt,
      client_id: process.env[svc.client_id_env]!,
      client_secret: process.env[svc.client_secret_env]!,
    }),
  })
  if (!resp.ok) return null
  const data = await resp.json()
  await storeToken(service, {
    access_token: data.access_token,
    refresh_token: data.refresh_token || rt,
    expires_in: data.expires_in,
  })
  return data.access_token
}

export async function getConnections() {
  const { data } = await supabase
    .from('connections')
    .select('service, service_email, connected_at')
    .eq('user_id', 'jero')
  return (data || []).map(c => ({
    service: c.service, email: c.service_email,
    connected: true, connectedAt: c.connected_at,
  }))
}
SVCEOF
echo "  ✅ src/lib/services.ts"

# ══════════════════════════════════════════
# src/lib/schema.sql
# ══════════════════════════════════════════
cat > src/lib/schema.sql << 'SQLEOF'
CREATE TABLE connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'jero',
  service TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  scopes TEXT,
  service_user_id TEXT,
  service_email TEXT,
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, service)
);

CREATE TABLE dogma_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'jero',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE generated_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'jero',
  filename TEXT NOT NULL,
  filetype TEXT NOT NULL,
  blob_url TEXT NOT NULL,
  size_bytes INTEGER,
  generated_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'jero',
  action TEXT NOT NULL,
  details JSONB,
  agent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
SQLEOF
echo "  ✅ src/lib/schema.sql"

# ══════════════════════════════════════════
# src/app/api/chat/route.ts
# ══════════════════════════════════════════
cat > src/app/api/chat/route.ts << 'CHATEOF'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getToken, getConnections, SERVICES, supabase } from '@/lib/services'
import { put } from '@vercel/blob'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const LOCAL_TOOLS: Anthropic.Tool[] = [
  {name:'update_field',description:'Update any field on any entity',input_schema:{type:'object' as const,properties:{collection:{type:'string'},entity_id:{type:'string'},field:{type:'string'},value:{type:'string'}},required:['collection','entity_id','field','value']}},
  {name:'add_note',description:'Add note to entity',input_schema:{type:'object' as const,properties:{collection:{type:'string'},entity_id:{type:'string'},text:{type:'string'}},required:['collection','entity_id','text']}},
  {name:'generate_csv',description:'Generate CSV spreadsheet. Returns download URL.',input_schema:{type:'object' as const,properties:{title:{type:'string'},headers:{type:'array',items:{type:'string'}},rows:{type:'array',items:{type:'array',items:{type:'string'}}}},required:['title','headers','rows']}},
  {name:'generate_docx',description:'Generate Word .doc. Returns download URL.',input_schema:{type:'object' as const,properties:{title:{type:'string'},html:{type:'string'}},required:['title','html']}},
  {name:'generate_pdf',description:'Generate PDF. Returns download URL.',input_schema:{type:'object' as const,properties:{title:{type:'string'},html:{type:'string'}},required:['title','html']}},
  {name:'generate_pptx',description:'Generate PowerPoint. Returns download URL.',input_schema:{type:'object' as const,properties:{title:{type:'string'},slides:{type:'array',items:{type:'object',properties:{title:{type:'string'},body:{type:'string'}},required:['title','body']}}},required:['title','slides']}},
  {name:'generate_latex',description:'Generate LaTeX .tex. Returns download URL.',input_schema:{type:'object' as const,properties:{title:{type:'string'},content:{type:'string'}},required:['title','content']}},
  {name:'advance_pilot',description:'Advance pilot stage',input_schema:{type:'object' as const,properties:{pilot_id:{type:'string'}},required:['pilot_id']}},
  {name:'advance_investor',description:'Advance investor stage',input_schema:{type:'object' as const,properties:{investor_id:{type:'string'}},required:['investor_id']}},
  {name:'resolve_incident',description:'Resolve incident',input_schema:{type:'object' as const,properties:{incident_id:{type:'string'}},required:['incident_id']}},
  {name:'complete_task',description:'Complete task',input_schema:{type:'object' as const,properties:{task_id:{type:'string'}},required:['task_id']}},
]

async function genFile(name: string, content: string, ct: string): Promise<string> {
  const blob = await put(name, content, { access: 'public', contentType: ct })
  await supabase.from('generated_files').insert({ filename: name, filetype: name.split('.').pop(), blob_url: blob.url, size_bytes: content.length, generated_by: 'agent' })
  return blob.url
}

async function execTool(name: string, input: any): Promise<{result:string; fileUrl?:string; fileName?:string}> {
  if (name === 'update_field') {
    const { data: row } = await supabase.from('dogma_data').select('data').eq('user_id','jero').single()
    if (!row) return { result: 'No data' }
    const D = row.data; const col = D[input.collection]
    if (Array.isArray(col)) { const idx = col.findIndex((x:any) => x.id === input.entity_id); if (idx >= 0) col[idx][input.field] = isNaN(Number(input.value)) ? input.value : Number(input.value) }
    await supabase.from('dogma_data').update({ data: D }).eq('user_id','jero')
    return { result: `Updated ${input.collection}/${input.entity_id}.${input.field}=${input.value}` }
  }
  if (name === 'add_note') {
    const { data: row } = await supabase.from('dogma_data').select('data').eq('user_id','jero').single()
    if (!row) return { result: 'No data' }
    const D = row.data; const col = D[input.collection]
    if (Array.isArray(col)) { const idx = col.findIndex((x:any) => x.id === input.entity_id); if (idx >= 0) { if (!col[idx].notes) col[idx].notes = []; col[idx].notes.push({t:input.text,by:'Agent',at:new Date().toLocaleString()}) } }
    await supabase.from('dogma_data').update({ data: D }).eq('user_id','jero')
    return { result: 'Note added' }
  }
  if (name === 'generate_csv') {
    const csv = '\uFEFF' + input.headers.join(',') + '\n' + input.rows.map((r:string[]) => r.map((c:string) => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
    const url = await genFile(input.title+'.csv', csv, 'text/csv')
    return { result: 'CSV created', fileUrl: url, fileName: input.title+'.csv' }
  }
  if (name === 'generate_docx') {
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>body{font-family:Calibri;font-size:11pt}h1{color:#C8A74B;border-bottom:2px solid #C8A74B}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:6px}th{background:#f5f5f5}</style></head><body><h1>${input.title}</h1>${input.html}</body></html>`
    const url = await genFile(input.title.replace(/\s+/g,'_')+'.doc', html, 'application/msword')
    return { result: 'Word doc created', fileUrl: url, fileName: input.title+'.doc' }
  }
  if (name === 'generate_pdf') {
    const html = `<!DOCTYPE html><html><head><title>${input.title}</title><style>body{font-family:Helvetica;padding:40px;max-width:700px;margin:auto}h1{color:#C8A74B;border-bottom:2px solid #C8A74B}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:5px}th{background:#f5f5f5}</style></head><body><h1>${input.title}</h1>${input.html}</body></html>`
    const url = await genFile(input.title+'.html', html, 'text/html')
    return { result: 'PDF ready (open to print)', fileUrl: url, fileName: input.title+'.pdf' }
  }
  if (name === 'generate_pptx') {
    const slides = (input.slides||[]).map((s:any,i:number) => `<div style="page-break-after:always;width:960px;height:540px;padding:60px;background:${i===0?'#0A0A18':'#fff'};color:${i===0?'#C8A74B':'#1a1a2e'}"><h1>${s.title}</h1><div style="font-size:14pt">${s.body}</div></div>`).join('')
    const html = `<html><head><style>@page{size:960px 540px;margin:0}body{margin:0}</style></head><body>${slides}</body></html>`
    const url = await genFile(input.title+'.ppt', html, 'application/vnd.ms-powerpoint')
    return { result: 'Presentation created', fileUrl: url, fileName: input.title+'.ppt' }
  }
  if (name === 'generate_latex') {
    const tex = `\\documentclass{article}\n\\usepackage[margin=1in]{geometry}\n\\usepackage{booktabs,hyperref}\n\\title{${input.title}}\n\\author{DOGMA Robotics}\n\\date{\\today}\n\\begin{document}\n\\maketitle\n${input.content}\n\\end{document}`
    const url = await genFile(input.title.replace(/\s/g,'_')+'.tex', tex, 'application/x-tex')
    return { result: 'LaTeX created', fileUrl: url, fileName: input.title+'.tex' }
  }
  return { result: name + ' executed' }
}

export async function POST(req: NextRequest) {
  const { message, agentId, agentSys, dataContext } = await req.json()

  const connections = await getConnections()
  const mcpServers: any[] = []
  for (const conn of connections) {
    const svc = SERVICES[conn.service]
    if (svc?.mcp_url) {
      const token = await getToken(conn.service)
      if (token) mcpServers.push({ type:'url', url:svc.mcp_url, name:conn.service, authorization_token:token })
    }
  }

  const messages: Anthropic.MessageParam[] = [
    { role:'user', content: `${agentSys}\nDATA: ${dataContext}\nDate: ${new Date().toLocaleDateString()}\n\nUser: ${message}` }
  ]

  const allText: string[] = []
  const allFiles: {name:string;url:string;type:string}[] = []
  let loops = 0

  while (loops < 6) {
    loops++
    const params: any = { model:'claude-sonnet-4-20250514', max_tokens:4096, messages, tools:LOCAL_TOOLS }
    if (mcpServers.length > 0) params.mcp_servers = mcpServers

    const resp = await client.messages.create(params)
    const toolResults: Anthropic.ToolResultBlockParam[] = []

    for (const block of resp.content) {
      if (block.type === 'text') allText.push(block.text)
      if (block.type === 'tool_use') {
        const { result, fileUrl, fileName } = await execTool(block.name, block.input)
        allText.push(`✅ ${result}`)
        if (fileUrl && fileName) allFiles.push({ name:fileName, url:fileUrl, type:block.name.replace('generate_','') })
        toolResults.push({ type:'tool_result', tool_use_id:block.id, content: fileUrl ? `${result}\nDownload: ${fileUrl}` : result })
      }
    }

    if (resp.stop_reason === 'tool_use' && toolResults.length > 0) {
      messages.push({ role:'assistant', content: resp.content })
      messages.push({ role:'user', content: toolResults })
      continue
    }
    break
  }

  await supabase.from('activity_log').insert({ action:'agent_chat', details:{agent:agentId,message,files:allFiles.length}, agent_id:agentId })
  return NextResponse.json({ text: allText.join('\n'), files: allFiles, mcpConnected: mcpServers.map(m=>m.name) })
}
CHATEOF
echo "  ✅ src/app/api/chat/route.ts"

# ══════════════════════════════════════════
# src/app/api/connections/route.ts
# ══════════════════════════════════════════
cat > src/app/api/connections/route.ts << 'CONNEOF'
import { NextRequest, NextResponse } from 'next/server'
import { SERVICES, storeToken, supabase, getConnections } from '@/lib/services'

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function GET() {
  const connections = await getConnections()
  const all = Object.entries(SERVICES).map(([key, svc]) => {
    const conn = connections.find(c => c.service === key)
    return {
      id: key, name: svc.name, icon: svc.icon,
      connected: !!conn, email: conn?.email || null,
      connectedAt: conn?.connectedAt || null,
      hasCredentials: !!(process.env[svc.client_id_env] && process.env[svc.client_secret_env]),
    }
  })
  return NextResponse.json(all)
}

export async function POST(req: NextRequest) {
  const { service, action, token } = await req.json()

  if (action === 'disconnect') {
    await supabase.from('connections').delete().eq('user_id','jero').eq('service', service)
    return NextResponse.json({ ok: true })
  }

  if (action === 'manual_token') {
    await storeToken(service, { access_token: token })
    return NextResponse.json({ ok: true })
  }

  const svc = SERVICES[service]
  if (!svc) return NextResponse.json({ error: 'Unknown service' }, { status: 400 })

  const clientId = process.env[svc.client_id_env]
  if (!clientId) return NextResponse.json({ error: `Set ${svc.client_id_env} in env` }, { status: 400 })

  const state = Buffer.from(JSON.stringify({ service })).toString('base64url')
  const params = new URLSearchParams({
    client_id: clientId, redirect_uri: `${BASE_URL}/api/connections/callback`,
    response_type: 'code', scope: svc.scopes, state,
  })
  if (service === 'google') { params.set('access_type','offline'); params.set('prompt','consent') }

  return NextResponse.json({ oauth_url: `${svc.auth_url}?${params}` })
}
CONNEOF
echo "  ✅ src/app/api/connections/route.ts"

# ══════════════════════════════════════════
# src/app/api/connections/callback/route.ts
# ══════════════════════════════════════════
cat > src/app/api/connections/callback/route.ts << 'CBEOF'
import { NextRequest, NextResponse } from 'next/server'
import { SERVICES, storeToken } from '@/lib/services'

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  if (!code || !state) return NextResponse.redirect(`${BASE_URL}/settings?error=missing_params`)

  let parsed: { service: string }
  try { parsed = JSON.parse(Buffer.from(state, 'base64url').toString()) }
  catch { return NextResponse.redirect(`${BASE_URL}/settings?error=invalid_state`) }

  const svc = SERVICES[parsed.service]
  if (!svc) return NextResponse.redirect(`${BASE_URL}/settings?error=unknown_service`)

  const resp = await fetch(svc.token_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({
      grant_type: 'authorization_code', code,
      redirect_uri: `${BASE_URL}/api/connections/callback`,
      client_id: process.env[svc.client_id_env]!,
      client_secret: process.env[svc.client_secret_env]!,
    }),
  })

  if (!resp.ok) return NextResponse.redirect(`${BASE_URL}/settings?error=token_failed&service=${parsed.service}`)
  const tokens = await resp.json()
  await storeToken(parsed.service, { access_token: tokens.access_token, refresh_token: tokens.refresh_token, expires_in: tokens.expires_in })
  return NextResponse.redirect(`${BASE_URL}/settings?connected=${parsed.service}`)
}
CBEOF
echo "  ✅ src/app/api/connections/callback/route.ts"

# ══════════════════════════════════════════
# src/app/settings/page.tsx
# ══════════════════════════════════════════
cat > src/app/settings/page.tsx << 'SETEOF'
'use client'
import { useState, useEffect } from 'react'

type Conn = { id:string; name:string; icon:string; connected:boolean; email:string|null; connectedAt:string|null; hasCredentials:boolean }

export default function Settings() {
  const [conns, setConns] = useState<Conn[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/connections').then(r=>r.json()).then(d=>{setConns(d);setLoading(false)})
    const p = new URLSearchParams(window.location.search)
    if (p.get('connected')) setMsg('✅ '+p.get('connected')+' connected!')
    if (p.get('error')) setMsg('❌ Error: '+p.get('error'))
  }, [])

  const connect = async (s:string) => {
    const r = await fetch('/api/connections',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({service:s,action:'connect'})})
    const d = await r.json()
    if (d.oauth_url) window.location.href = d.oauth_url
    if (d.error) setMsg('❌ '+d.error)
  }

  const disconnect = async (s:string) => {
    await fetch('/api/connections',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({service:s,action:'disconnect'})})
    setConns(conns.map(c=>c.id===s?{...c,connected:false,email:null}:c))
  }

  return (
    <div style={{maxWidth:700,margin:'40px auto',padding:20,fontFamily:"'Inter',sans-serif",color:'#C8C4BC',background:'#030308',minHeight:'100vh'}}>
      <h1 style={{fontSize:28,fontWeight:700,color:'#C8A74B',marginBottom:8}}>DOGMA OS — Connections</h1>
      <p style={{color:'#6E6A84',marginBottom:24}}>Connect services to enable AI agents to use them directly.</p>
      {msg && <div style={{padding:'10px 16px',background:'#0E0E20',border:'1px solid #1A1A35',borderRadius:6,marginBottom:16,fontSize:14}}>{msg}</div>}
      <div style={{display:'grid',gap:12}}>
        {loading ? <div>Loading...</div> : conns.map(c => (
          <div key={c.id} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 18px',background:'#060610',border:'1px solid #1A1A35',borderRadius:8,borderLeft:`3px solid ${c.connected?'#2D7A5D':'#444060'}`}}>
            <span style={{fontSize:28}}>{c.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:600}}>{c.name}</div>
              {c.connected
                ? <div style={{fontSize:12,color:'#2D7A5D'}}>Connected {c.email?`(${c.email})`:''}</div>
                : <div style={{fontSize:12,color:'#6E6A84'}}>{c.hasCredentials?'Not connected':'⚠ No OAuth credentials in env'}</div>}
            </div>
            {c.connected
              ? <button onClick={()=>disconnect(c.id)} style={{padding:'6px 14px',fontSize:12,fontWeight:600,background:'#8A333312',color:'#8A3333',border:'1px solid #8A333330',borderRadius:4,cursor:'pointer'}}>Disconnect</button>
              : <button onClick={()=>connect(c.id)} disabled={!c.hasCredentials} style={{padding:'6px 14px',fontSize:12,fontWeight:600,background:c.hasCredentials?'rgba(200,167,75,0.06)':'#0E0E20',color:c.hasCredentials?'#C8A74B':'#444060',border:`1px solid ${c.hasCredentials?'#C8A74B30':'#1A1A35'}`,borderRadius:4,cursor:c.hasCredentials?'pointer':'not-allowed'}}>Connect</button>}
          </div>
        ))}
      </div>
      <div style={{marginTop:32,padding:16,background:'#0A0A18',borderRadius:8,border:'1px solid #1A1A35'}}>
        <h3 style={{color:'#C8A74B',fontSize:14,marginBottom:8}}>Setup</h3>
        <ol style={{fontSize:13,color:'#6E6A84',lineHeight:1.8,paddingLeft:20}}>
          <li>Create OAuth app at each service developer portal</li>
          <li>Set callback URL to: <code style={{color:'#C8A74B'}}>YOUR_URL/api/connections/callback</code></li>
          <li>Add client ID + secret to Vercel env vars</li>
          <li>Click Connect above</li>
        </ol>
      </div>
      <a href="/" style={{display:'inline-block',marginTop:16,color:'#C8A74B',fontSize:13}}>← Back to Dashboard</a>
    </div>
  )
}
SETEOF
echo "  ✅ src/app/settings/page.tsx"

# ══════════════════════════════════════════
# .env.local
# ══════════════════════════════════════════
cat > .env.local << 'ENVEOF'
# Core
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-KEY-HERE
NEXTAUTH_SECRET=change-me-random-32-chars
NEXTAUTH_URL=http://localhost:3000

# Supabase (create at supabase.com)
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_KEY=eyJ...

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# OAuth (add as you connect services)
CANVA_CLIENT_ID=
CANVA_CLIENT_SECRET=
MIRO_CLIENT_ID=
MIRO_CLIENT_SECRET=
FIGMA_CLIENT_ID=
FIGMA_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MONDAY_CLIENT_ID=
MONDAY_CLIENT_SECRET=
ENVEOF
echo "  ✅ .env.local"

echo ""
echo "🎉 All files created!"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local — add your ANTHROPIC_API_KEY"
echo "  2. Create Supabase project → run src/lib/schema.sql"
echo "  3. npm run dev"
echo "  4. Open http://localhost:3000/settings to connect services"
