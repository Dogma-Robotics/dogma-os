'use client'
import { useState } from 'react'
import { C } from '@/lib/theme'

interface TopBarProps {
  search: string
  onSearchChange: (v: string) => void
  searchResults: { id: string; label: string; type: string; metric: string; color: string; level: string; parent: string }[]
  onSearchSelect: (result: any) => void
  kpis: { label: string; value: string | number; color: string }[]
  userName: string
  userRole: string
  authed: boolean
  onLogin: () => void
  onLogout: () => void
  approvalMode: 'advisory' | 'execute'
  onToggleApproval: () => void
  onOpenSettings: () => void
  onOpenCmd: () => void
}

export function TopBar({ search, onSearchChange, searchResults, onSearchSelect, kpis, userName, userRole, authed, onLogin, onLogout, approvalMode, onToggleApproval, onOpenSettings, onOpenCmd }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const dy = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div style={{ height: 42, background: C.bg1, borderBottom: '1px solid ' + C.bd, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, flexShrink: 0, zIndex: 30 }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 22, height: 22, background: C.gold, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: C.bg, fontWeight: 900, fontSize: 12, fontFamily: 'monospace' }}>D</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>DOGMA OS</span>
      </div>

      <div style={{ width: 1, height: 18, background: C.bd }} />
      <span style={{ fontSize: 12, color: C.tx2 }}>{dy}</span>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <input
          value={search}
          onChange={e => { onSearchChange(e.target.value); setSearchOpen(e.target.value.length >= 2) }}
          onFocus={() => { if (search.length >= 2) setSearchOpen(true) }}
          onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
          placeholder="Search..."
          style={{ width: 220, padding: '4px 10px 4px 26px', fontSize: 12, background: C.bg, border: '1px solid ' + C.bd, borderRadius: 3, color: C.tx, outline: 'none' }}
        />
        <span style={{ position: 'absolute', left: 8, top: 5, fontSize: 12, color: C.tx3 }}>🔍</span>
        <span onClick={onOpenCmd} style={{ position: 'absolute', right: 6, top: 4, fontSize: 9, color: C.tx3, padding: '1px 4px', border: '1px solid ' + C.bd, borderRadius: 2, cursor: 'pointer', fontFamily: "'JetBrains Mono',monospace" }}>⌘K</span>

        {searchOpen && searchResults.length > 0 && (
          <div style={{ position: 'absolute', top: 30, left: 0, width: 350, maxHeight: 400, overflowY: 'auto', background: C.bg1, border: '1px solid ' + C.bd, borderRadius: 6, zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
            {searchResults.map((r, i) => (
              <div key={i} onClick={() => { onSearchSelect(r); onSearchChange(''); setSearchOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid ' + C.bd + '40' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.bg3 }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: C.tx, fontWeight: 500 }}>{r.label}</div>
                  <div style={{ fontSize: 10, color: C.tx3 }}>{r.type}{r.parent ? ' • ' + r.parent : ''}</div>
                </div>
                <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: r.color }}>{r.metric}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      {/* KPIs */}
      {kpis.map((kpi, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 6px' }}>
          <span style={{ fontSize: 9, color: C.tx3 }}>{kpi.label}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: kpi.color, fontFamily: 'monospace' }}>{kpi.value}</span>
        </div>
      ))}

      <div style={{ width: 1, height: 18, background: C.bd }} />

      {/* Settings */}
      <span onClick={onOpenSettings} style={{ cursor: 'pointer', fontSize: 14, color: C.tx3, padding: '2px 4px' }} title="Settings">⚙️</span>

      {/* User pill */}
      <div onClick={() => { if (authed) onLogout(); else onLogin() }} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 3, cursor: 'pointer', background: authed ? C.g + '15' : C.bg3, border: '1px solid ' + (authed ? C.g + '30' : C.bd) }}>
        <span style={{ fontSize: 12 }}>{authed ? '🔓' : '🔒'}</span>
        <span style={{ fontSize: 10, color: authed ? C.g : C.a, fontWeight: 600 }}>{authed ? userName || 'Admin' : 'Login'}</span>
        {authed && userRole && <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 2, background: C.gold + '15', color: C.gold, fontWeight: 700, textTransform: 'uppercase' }}>{userRole}</span>}
      </div>
    </div>
  )
}
