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
      const r = await fetch(`${GW}/`, { signal: c.signal, mode: 'cors' }); clearTimeout(t)
      if (r.ok) { setGateway({ connected: true, version: 'local', model: 'openclaw' }); return }
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
          if (r.status >= 400) throw new Error(`Gateway ${r.status}`)
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
