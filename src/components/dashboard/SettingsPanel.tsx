'use client'
import { C } from '@/lib/theme'

interface SettingsPanelProps {
  open: boolean
  onClose: () => void
  userName: string
  userRole: string
  gatewayConnected: boolean
  approvalMode: 'advisory' | 'execute'
  onToggleApproval: () => void
  agentEditPolicy: 'direct' | 'approval' | 'readonly'
  onSetAgentPolicy: (p: 'direct' | 'approval' | 'readonly') => void
}

export function SettingsPanel({ open, onClose, userName, userRole, gatewayConnected, approvalMode, onToggleApproval, agentEditPolicy, onSetAgentPolicy }: SettingsPanelProps) {
  if (!open) return null

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: C.bg1, border: '1px solid ' + C.gold + '40', borderRadius: 8, padding: 24, width: 480, maxHeight: '80vh', overflowY: 'auto' }} onMouseDown={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: C.gold }}>⚙️ Settings</span>
          <span onClick={onClose} style={{ cursor: 'pointer', color: C.tx3, fontSize: 20 }}>×</span>
        </div>

        {/* Account */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 8, borderBottom: '1px solid ' + C.bd, paddingBottom: 4 }}>Account</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14, borderBottom: '1px solid ' + C.bd + '40' }}>
            <span style={{ color: C.tx2 }}>Name</span>
            <span style={{ color: C.tx }}>{userName || 'Not logged in'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14, borderBottom: '1px solid ' + C.bd + '40' }}>
            <span style={{ color: C.tx2 }}>Role</span>
            <span style={{ color: C.gold, fontWeight: 600, textTransform: 'uppercase', fontSize: 12 }}>{userRole || 'viewer'}</span>
          </div>
        </div>

        {/* Gateway */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 8, borderBottom: '1px solid ' + C.bd, paddingBottom: 4 }}>OpenClaw Gateway</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: gatewayConnected ? C.g : C.r }} />
            <span style={{ fontSize: 13, color: gatewayConnected ? C.g : C.r, fontWeight: 600 }}>{gatewayConnected ? 'Connected' : 'Disconnected'}</span>
            <span style={{ fontSize: 11, color: C.tx3 }}>localhost:18789</span>
          </div>
        </div>

        {/* Approval Mode */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 8, borderBottom: '1px solid ' + C.bd, paddingBottom: 4 }}>Approval Mode</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['advisory', 'execute'] as const).map(m => (
              <div key={m} onClick={onToggleApproval} style={{ flex: 1, padding: '10px 12px', borderRadius: 4, cursor: 'pointer', background: approvalMode === m ? (m === 'execute' ? C.r + '15' : C.g + '15') : C.bg, border: '1px solid ' + (approvalMode === m ? (m === 'execute' ? C.r + '40' : C.g + '40') : C.bd), textAlign: 'center' }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>{m === 'advisory' ? '🔒' : '⚡'}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: approvalMode === m ? (m === 'execute' ? C.r : C.g) : C.tx3, textTransform: 'uppercase' }}>{m}</div>
                <div style={{ fontSize: 10, color: C.tx3, marginTop: 2 }}>{m === 'advisory' ? 'Mutations need approval' : 'Mutations apply immediately'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Edit Policy */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 8, borderBottom: '1px solid ' + C.bd, paddingBottom: 4 }}>Agent Edit Policy</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['direct', 'approval', 'readonly'] as const).map(p => (
              <div key={p} onClick={() => onSetAgentPolicy(p)} style={{ flex: 1, padding: '8px 10px', borderRadius: 4, cursor: 'pointer', background: agentEditPolicy === p ? C.gold + '12' : C.bg, border: '1px solid ' + (agentEditPolicy === p ? C.gold + '40' : C.bd), textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: agentEditPolicy === p ? C.gold : C.tx3, textTransform: 'uppercase' }}>{p}</div>
                <div style={{ fontSize: 9, color: C.tx3, marginTop: 2 }}>{p === 'direct' ? 'Auto-apply' : p === 'approval' ? 'Review first' : 'No edits'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
