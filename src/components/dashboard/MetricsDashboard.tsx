'use client'
import { useState } from 'react'
import { C } from '@/lib/theme'

interface MetricsDashboardProps {
  finance: { burn: number; cash: number; runway: number; bom: number }
  pilots: { name: string; viab: number; stage: string; roi: string }[]
  controlModules: { id: string; name: string; rate: string; status: string }[]
  subsystems: { name: string; maturity: number; status: string }[]
  tasks: { title: string; status: string; priority: string; progress: number }[]
  incidents: { id: string; status: string; severity: string }[]
  canEdit?: boolean
  onEditFinance?: (field: string, value: number) => void
  onEditModule?: (id: string, field: string, value: string) => void
  onEditSubsystem?: (name: string, field: string, value: any) => void
}

const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

function fmt(n: number, d = 1): string { return n >= 1000 ? `${(n / 1000).toFixed(d)}K` : n.toFixed(d) }
function parseRoi(roi: string): number { const n = parseFloat(roi.replace(/[^0-9.\-]/g, '')); return isNaN(n) ? 0 : n }
function sDot(s: string): string { const l = s.toLowerCase(); return l === 'active' ? C.g : l === 'testing' ? C.a : l === 'blocked' ? C.r : C.tx3 }

// Editable number: click to edit
function EditNum({ value, color, size, suffix, canEdit, onSave }: { value: number; color: string; size: number; suffix?: string; canEdit?: boolean; onSave?: (v: number) => void }) {
  const [ed, setEd] = useState(false)
  const [v, setV] = useState(String(value))
  if (ed && canEdit) return <input autoFocus value={v} onChange={e => setV(e.target.value)}
    onKeyDown={e => { if (e.key === 'Enter') { onSave?.(parseFloat(v) || 0); setEd(false) } if (e.key === 'Escape') setEd(false) }}
    onBlur={() => { onSave?.(parseFloat(v) || 0); setEd(false) }}
    style={{ ...mono, fontSize: size, fontWeight: 700, color, background: C.bg, border: '1px solid ' + C.gold + '40', borderRadius: 3, outline: 'none', width: '100%', padding: '2px 4px', textAlign: 'center' }} />
  return <div onClick={() => { if (canEdit) { setV(String(value)); setEd(true) } }} style={{ ...mono, fontSize: size, fontWeight: 700, color, cursor: canEdit ? 'pointer' : 'default' }} title={canEdit ? 'Click to edit' : ''}>
    ${fmt(value)}{suffix || ''}
    {canEdit && <span style={{ fontSize: 9, color: C.tx3, marginLeft: 4 }}>✏️</span>}
  </div>
}

// Editable status dropdown
function EditStatus({ value, canEdit, onSave }: { value: string; canEdit?: boolean; onSave?: (v: string) => void }) {
  if (!canEdit) return <div style={{ width: 8, height: 8, borderRadius: '50%', background: sDot(value) }} />
  return <select value={value} onChange={e => onSave?.(e.target.value)}
    style={{ background: C.bg2, border: '1px solid ' + C.bd, borderRadius: 3, color: sDot(value), fontSize: 9, padding: '1px 4px', outline: 'none', cursor: 'pointer' }}>
    {['planned', 'active', 'testing', 'blocked', 'done'].map(s => <option key={s} value={s}>{s}</option>)}
  </select>
}

function Card({ title, children, span = 1 }: { title: string; children: React.ReactNode; span?: number }) {
  return <div style={{ gridColumn: `span ${span}`, background: C.bg1, border: '1px solid ' + C.bd, borderRadius: 6, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.gold }}>{title}</div>
    {children}
  </div>
}

export default function MetricsDashboard({ finance, pilots, controlModules, subsystems, tasks, incidents, canEdit, onEditFinance, onEditModule, onEditSubsystem }: MetricsDashboardProps) {
  const criticalTasks = tasks.filter(t => t.priority.toLowerCase() === 'critical' || t.status.toLowerCase() === 'blocked')
  const totalRoi = pilots.reduce((sum, p) => sum + parseRoi(p.roi), 0)
  const modules = Array.from({ length: 10 }, (_, i) => {
    const id = `m${i}`
    return controlModules.find(m => m.id === id) ?? { id, name: `M${i}`, rate: '-', status: 'planned' }
  })

  return <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16, background: C.bg, color: C.tx, fontSize: 13 }}>
    {/* Finance */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      <Card title="Burn Rate">
        <EditNum value={finance.burn} color={finance.burn > 15000 ? C.r : C.tx} size={22} suffix="/mo" canEdit={canEdit} onSave={v => onEditFinance?.('burn', v)} />
        {finance.burn > 15000 && <div style={{ fontSize: 10, color: C.r }}>Above $15K threshold</div>}
      </Card>
      <Card title="Cash">
        <EditNum value={finance.cash} color={C.tx} size={22} canEdit={canEdit} onSave={v => onEditFinance?.('cash', v)} />
      </Card>
      <Card title="Runway">
        <EditNum value={finance.runway} color={finance.runway < 3 ? C.r : finance.runway < 6 ? C.a : C.tx} size={22} suffix=" mo" canEdit={canEdit} onSave={v => onEditFinance?.('runway', v)} />
        {finance.runway < 3 && <div style={{ fontSize: 10, color: C.r }}>Critical</div>}
      </Card>
      <Card title="BOM Cost">
        <EditNum value={finance.bom} color={C.tx} size={22} suffix="/unit" canEdit={canEdit} onSave={v => onEditFinance?.('bom', v)} />
      </Card>
    </div>

    {/* Pipeline */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      <Card title="Active Pilots">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ ...mono, fontSize: 22, fontWeight: 700 }}>{pilots.length}</span>
          <span style={{ fontSize: 11, color: C.tx2 }}>pilots</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32, marginTop: 4 }}>
          {pilots.map((p, i) => <div key={i} title={`${p.name}: ${p.viab}%`} style={{ flex: 1, maxWidth: 18, height: `${Math.max(p.viab, 5)}%`, background: p.viab >= 70 ? C.g : p.viab >= 40 ? C.a : C.r, borderRadius: 2, minHeight: 2 }} />)}
        </div>
      </Card>
      <Card title="Total Pipeline ROI">
        <div style={{ ...mono, fontSize: 22, fontWeight: 700 }}>{totalRoi >= 0 ? '+' : ''}{totalRoi.toFixed(1)}x</div>
        <div style={{ fontSize: 11, color: C.tx2 }}>across {pilots.length} pilots</div>
      </Card>
      <Card title="Critical Tasks">
        <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: criticalTasks.length > 0 ? C.r : C.g }}>{criticalTasks.length}</div>
        <div style={{ fontSize: 11, color: C.tx2 }}>critical + blocked</div>
      </Card>
    </div>

    {/* Control Modules M0-M9 */}
    <Card title="Control Modules M0-M9">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 6 }}>
        {modules.map(m => <div key={m.id} style={{ background: C.bg2, border: '1px solid ' + C.bd, borderRadius: 4, padding: '8px 4px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <EditStatus value={m.status} canEdit={canEdit} onSave={v => onEditModule?.(m.id, 'status', v)} />
          <div style={{ ...mono, fontSize: 9, fontWeight: 600, color: C.tx, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{m.name}</div>
          <div style={{ ...mono, fontSize: 8, color: C.tx2 }}>{m.rate}</div>
        </div>)}
      </div>
    </Card>

    {/* Subsystem Readiness */}
    <Card title="Subsystem Readiness">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {subsystems.map(s => <div key={s.name}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: C.tx }}>{s.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {canEdit && <input type="range" min={0} max={100} value={s.maturity}
                onChange={e => onEditSubsystem?.(s.name, 'mat', parseInt(e.target.value))}
                style={{ width: 60, accentColor: C.gold, height: 4 }} />}
              <span style={{ ...mono, fontSize: 11, color: C.tx2 }}>{s.maturity}%</span>
            </div>
          </div>
          <div style={{ height: 6, background: C.bg2, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(s.maturity, 100)}%`, background: s.maturity >= 80 ? C.g : s.maturity >= 50 ? C.a : C.r, borderRadius: 3, transition: 'width 0.3s' }} />
          </div>
        </div>)}
      </div>
    </Card>

    {/* Incidents */}
    {incidents.filter(i => i.status !== 'resolved').length > 0 && <Card title="Open Incidents">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {incidents.filter(i => i.status !== 'resolved').map(i => <span key={i.id} style={{ padding: '2px 8px', fontSize: 10, borderRadius: 3, background: (i.severity === 'high' || i.severity === 'critical' ? C.r : C.a) + '15', color: i.severity === 'high' || i.severity === 'critical' ? C.r : C.a, border: '1px solid ' + (i.severity === 'high' ? C.r : C.a) + '30', ...mono }}>{i.id} ({i.severity})</span>)}
      </div>
    </Card>}
  </div>
}
