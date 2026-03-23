'use client'
import { useState, useEffect, useCallback } from 'react'

const GW = 'http://localhost:18789'
const TOKEN = 'c1b587d6e4015fcba76853c05e4004d8a2c3576c4eff3d0b'

export interface GatewayStatus { connected: boolean; version: string; model: string }
export interface ChatFile { name: string; url: string; type: string }
export interface ToolCall { tool: string; input: string; output?: string; status: string }
export interface ChatResponse { text: string; files: ChatFile[]; toolCalls: ToolCall[]; sessionId: string; model: string; via: 'gateway'|'vercel' }

export function useOpenClaw() {
  const [gateway, setGateway] = useState<GatewayStatus>({ connected: false, version: '', model: '' })
  const [toolLog, setToolLog] = useState<ToolCall[]>([])
  const [sessionId, setSessionId] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  // Health check: try /v1/chat/completions with a tiny request
  const checkGateway = useCallback(async () => {
    try {
      const c = new AbortController()
      const t = setTimeout(() => c.abort(), 3000)
      const r = await fetch(GW + '/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + TOKEN },
        body: JSON.stringify({ model: 'openclaw', messages: [{ role: 'user', content: 'ping' }], max_tokens: 5 }),
        signal: c.signal,
      })
      clearTimeout(t)
      if (r.ok) {
        setGateway({ connected: true, version: 'local', model: 'openclaw' })
        return
      }
    } catch {}
    setGateway(p => ({ ...p, connected: false }))
  }, [])

  useEffect(() => {
    checkGateway()
    const iv = setInterval(checkGateway, 30000)
    return () => clearInterval(iv)
  }, [checkGateway])

  const sendMessage = useCallback(async (agentId: string, message: string, options: { dataContext?: string; mode?: string } = {}): Promise<ChatResponse> => {
    setLoading(true)
    try {
      // Path A: Local OpenClaw gateway (full computer access)
      if (gateway.connected) {
        try {
          const sysMsg = options.dataContext ? 'DOGMA context:\n' + options.dataContext : ''
          const msgs: any[] = []
          if (sysMsg) msgs.push({ role: 'system', content: sysMsg })
          msgs.push({ role: 'user', content: message })

          const r = await fetch(GW + '/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + TOKEN,
              'x-openclaw-agent-id': agentId,
            },
            body: JSON.stringify({
              model: 'openclaw:' + agentId,
              messages: msgs,
              user: 'dogma-dashboard',
            }),
          })
          if (r.ok) {
            const d = await r.json()
            const text = d.choices?.[0]?.message?.content || '(no response)'
            setLoading(false)
            return { text, files: [], toolCalls: [], sessionId: d.id || '', model: d.model || 'openclaw', via: 'gateway' }
          }
          throw new Error('Gateway returned ' + r.status)
        } catch (e) {
          console.warn('[OpenClaw] Gateway call failed:', e)
          setGateway(p => ({ ...p, connected: false }))
        }
      }

      // Path B: Vercel API fallback (no computer access)
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, agentId, dataContext: options.dataContext, mode: options.mode || 'advisory' }),
      })
      const d = await r.json()
      setLoading(false)
      return {
        text: d.text || '(no response)',
        files: (d.files || []).map((f: any) => ({ name: f.name, url: f.url, type: f.type || 'file' })),
        toolCalls: (d.toolCalls || []).map((tc: any) => ({ tool: tc.tool, input: tc.input, output: tc.output, status: tc.status || 'executed' })),
        sessionId: d.sessionId || '', model: d.model || 'unknown', via: 'vercel',
      }
    } catch (e: any) {
      setLoading(false)
      return { text: 'Error: ' + e.message, files: [], toolCalls: [], sessionId: '', model: 'error', via: 'vercel' }
    }
  }, [gateway.connected])

  const clearSession = useCallback(() => { setSessionId(null); setToolLog([]) }, [])
  return { gateway, toolLog, sessionId, loading, sendMessage, clearSession, checkGateway }
}
