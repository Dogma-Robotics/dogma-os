'use client'
import { useRef, useEffect } from 'react'
import { C } from '@/lib/theme'
import { MsgText } from '../ui/MsgText'
import { TypeWriter } from '../ui/TypeWriter'
import { Btn } from '../ui/EditableCell'

interface ChatPanelProps {
  agents: { id: string; name: string; icon: string; color: string; cat: string; desc: string }[]
  agentCategories: { id: string; label: string; color: string }[]
  agentId: string
  onSelectAgent: (id: string) => void
  messages: { role: string; text: string; thinking?: string; via?: string; files?: any[]; mutations?: any[] }[]
  input: string
  onInputChange: (v: string) => void
  onSend: () => void
  loading: boolean
  streamingMsg: { text: string; thinking: string } | null
  showThinking: boolean
  onToggleThinking: () => void
  gatewayConnected: boolean
  pendingMutations: any[]
  onApproveMutation: (idx: number) => void
  onRejectMutation: (idx: number) => void
  mode: string
  onSetMode: (m: string) => void
}

export function ChatPanel({
  agents, agentCategories, agentId, onSelectAgent,
  messages, input, onInputChange, onSend, loading,
  streamingMsg, showThinking, onToggleThinking,
  gatewayConnected, pendingMutations,
  onApproveMutation, onRejectMutation,
  mode, onSetMode,
}: ChatPanelProps) {
  const chatEnd = useRef<HTMLDivElement>(null)
  const curAgent = agents.find(a => a.id === agentId) || agents[0]

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, agentId])

  const MODES = [
    { id: 'chat', label: '💬 Chat' },
    { id: 'design', label: 'Design' },
    { id: 'openclaw', label: 'OpenClaw' },
    { id: 'timeline', label: '📊 Timeline' },
    { id: 'approvals', label: (pendingMutations.length > 0 ? '⚠️' : '✅') + ' Queue' + (pendingMutations.length > 0 ? ' (' + pendingMutations.length + ')' : '') },
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Mode tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid ' + C.bd, flexShrink: 0 }}>
        {MODES.map(m => (
          <div key={m.id} onClick={() => onSetMode(m.id)} style={{ flex: 1, padding: '8px 0', textAlign: 'center', fontSize: 11, fontWeight: 600, cursor: 'pointer', color: mode === m.id ? C.gold : C.tx3, borderBottom: mode === m.id ? '2px solid ' + C.gold : '2px solid transparent', background: mode === m.id ? C.gold + '08' : 'transparent' }}>
            {m.label}
          </div>
        ))}
      </div>

      {mode === 'chat' && <>
        {/* Agent selector */}
        <div style={{ padding: '6px 8px', borderBottom: '1px solid ' + C.bd, flexShrink: 0, maxHeight: 160, overflowY: 'auto' }}>
          {agentCategories.map(cat => {
            const catAgents = agents.filter(a => a.cat === cat.id)
            return (
              <div key={cat.id} style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 9, color: cat.color, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 2 }}>{cat.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {catAgents.map(ag => {
                    const isA = agentId === ag.id
                    return (
                      <div key={ag.id} onClick={() => onSelectAgent(ag.id)} title={ag.desc} style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '3px 6px', borderRadius: 3, cursor: 'pointer', background: isA ? ag.color + '15' : 'transparent', border: '1px solid ' + (isA ? ag.color + '30' : C.bd + '50'), transition: 'all 0.15s' }}>
                        <span style={{ fontSize: 11 }}>{ag.icon}</span>
                        <span style={{ fontSize: 9, fontWeight: 600, color: isA ? ag.color : C.tx3 }}>{ag.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Current agent header */}
        <div style={{ padding: '8px 10px', borderBottom: '1px solid ' + C.bd, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: curAgent.color }}>{curAgent.icon} {curAgent.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, background: gatewayConnected ? 'rgba(45,122,93,0.1)' : 'rgba(138,51,51,0.1)', color: gatewayConnected ? '#2D7A5D' : '#8A3333', border: '1px solid ' + (gatewayConnected ? 'rgba(45,122,93,0.25)' : 'rgba(138,51,51,0.25)') }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: gatewayConnected ? '#2D7A5D' : '#8A3333' }} />
              {gatewayConnected ? 'OpenClaw' : 'Cloud'}
            </div>
          </div>
          <div style={{ fontSize: 11, color: C.tx2, lineHeight: 1.4, marginTop: 2 }}>{curAgent.desc}</div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {messages.length === 0 && (
            <div style={{ fontSize: 13, color: C.tx3, textAlign: 'center', padding: 20 }}>
              Ask {curAgent.name}<br /><span style={{ fontSize: 11 }}>Single agent — direct conversation</span>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ maxWidth: '90%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ padding: '6px 10px', borderRadius: 6, background: msg.role === 'user' ? C.bg3 : C.bg2, borderLeft: msg.role === 'ai' ? '2px solid ' + (msg.via === 'openclaw' ? '#2D7A5D' : curAgent.color) : 'none', fontSize: 13, color: C.tx, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                <MsgText text={msg.text} />
              </div>
              {msg.thinking && showThinking && (
                <div style={{ padding: '6px 10px', borderRadius: 6, background: C.bg3, borderLeft: '2px solid ' + C.a, fontSize: 11, color: C.tx3, lineHeight: 1.5, whiteSpace: 'pre-wrap', marginTop: 3, maxHeight: 200, overflowY: 'auto' }}>
                  <div style={{ fontSize: 9, color: C.a, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4 }}>Claude thinking</div>
                  {msg.thinking}
                </div>
              )}
              {msg.files && msg.files.length > 0 && msg.files.map((f: any, j: number) => (
                <div key={j} style={{ marginTop: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', background: C.bg, border: '1px solid ' + C.gold + '30', borderRadius: 4 }}>
                    <span style={{ fontSize: 16 }}>{f.icon || '📁'}</span>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: C.tx }}>{f.name}</div></div>
                    <span onClick={() => { if (f.url && f.url !== '#') { const dl = document.createElement('a'); dl.href = f.url; dl.download = f.name || 'file'; document.body.appendChild(dl); dl.click(); document.body.removeChild(dl) } }} style={{ color: C.gold, cursor: 'pointer' }}>⬇</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {loading && <div style={{ fontSize: 12, color: curAgent.color, fontStyle: 'italic', padding: 4 }}>{curAgent.name} working...</div>}
          {streamingMsg && (
            <div style={{ maxWidth: '90%', alignSelf: 'flex-start' }}>
              {showThinking && streamingMsg.thinking && (
                <div style={{ padding: '6px 10px', borderRadius: 6, background: C.bg3, borderLeft: '2px solid ' + C.a, fontSize: 12, color: C.tx3, lineHeight: 1.5, whiteSpace: 'pre-wrap', marginBottom: 4, maxHeight: 200, overflowY: 'auto' }}>
                  <div style={{ fontSize: 9, color: C.a, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 4 }}>Thinking...</div>
                  {streamingMsg.thinking}
                </div>
              )}
              {streamingMsg.text && <TypeWriter text={streamingMsg.text} color={curAgent.color} />}
            </div>
          )}
          <div ref={chatEnd} />
        </div>

        {/* Thinking toggle */}
        <div style={{ padding: '4px 10px', borderTop: '1px solid ' + C.bd, display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <div onClick={onToggleThinking} style={{ fontSize: 9, padding: '2px 8px', borderRadius: 3, cursor: 'pointer', background: showThinking ? C.gold + '15' : 'transparent', color: showThinking ? C.gold : C.tx3, border: '1px solid ' + (showThinking ? C.gold + '30' : C.bd), userSelect: 'none' }}>
            {showThinking ? 'Thinking ON' : 'Thinking'}
          </div>
        </div>

        {/* Input */}
        <div style={{ padding: '8px 10px', borderTop: '1px solid ' + C.bd, display: 'flex', gap: 4, flexShrink: 0 }}>
          <input value={input} onChange={e => onInputChange(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') onSend() }} placeholder={'Ask ' + curAgent.name + '...'} style={{ flex: 1, padding: '6px 10px', fontSize: 13, background: C.bg, border: '1px solid ' + C.bd, borderRadius: 3, color: C.tx, outline: 'none' }} />
          <Btn v="gold" onClick={onSend}>↑</Btn>
        </div>

        {/* Pending mutations */}
        {pendingMutations.length > 0 && (
          <div style={{ borderTop: '1px solid ' + C.bd, padding: '6px 10px', maxHeight: 120, overflowY: 'auto', flexShrink: 0 }}>
            <div style={{ fontSize: 9, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 4 }}>Pending Mutations ({pendingMutations.length})</div>
            {pendingMutations.map((m: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 0', fontSize: 11, borderBottom: '1px solid ' + C.bd + '30' }}>
                <span style={{ color: C.a }}>{m.type}</span>
                <span style={{ flex: 1, color: C.tx2 }}>{m.entity_type}/{(m.entity_id || '').slice(0, 8)}</span>
                {m.field && <span style={{ color: C.tx3 }}>{m.field}→{String(m.value).slice(0, 12)}</span>}
                <span onClick={() => onApproveMutation(i)} style={{ cursor: 'pointer', color: C.g, fontWeight: 600, fontSize: 10 }}>✓</span>
                <span onClick={() => onRejectMutation(i)} style={{ cursor: 'pointer', color: C.r, fontSize: 10 }}>✕</span>
              </div>
            ))}
          </div>
        )}
      </>}

      {mode !== 'chat' && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.tx3, fontSize: 14 }}>
          {mode === 'design' && 'Design Guide — coming soon'}
          {mode === 'openclaw' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🦞</div>
              <div style={{ fontSize: 16, color: C.gold, fontWeight: 700 }}>OpenClaw Gateway</div>
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: gatewayConnected ? C.g : C.r }} />
                  <span style={{ color: gatewayConnected ? C.g : C.r, fontWeight: 600 }}>{gatewayConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
              </div>
            </div>
          )}
          {mode === 'timeline' && 'Activity Timeline — coming soon'}
          {mode === 'approvals' && pendingMutations.length === 0 && 'No pending approvals'}
        </div>
      )}
    </div>
  )
}
