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
