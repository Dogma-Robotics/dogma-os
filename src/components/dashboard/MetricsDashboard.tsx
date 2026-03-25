'use client'

import { C } from '@/lib/theme'

interface MetricsDashboardProps {
  finance: { burn: number; cash: number; runway: number; bom: number }
  pilots: { name: string; viab: number; stage: string; roi: string }[]
  controlModules: { id: string; name: string; rate: string; status: string }[]
  subsystems: { name: string; maturity: number; status: string }[]
  tasks: { title: string; status: string; priority: string; progress: number }[]
  incidents: { id: string; status: string; severity: string }[]
}

const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" }

function fmt(n: number, decimals = 1): string {
  if (n >= 1000) return `${(n / 1000).toFixed(decimals)}K`
  return n.toFixed(decimals)
}

function parseRoi(roi: string): number {
  const n = parseFloat(roi.replace(/[^0-9.\-]/g, ''))
  return isNaN(n) ? 0 : n
}

function statusDot(status: string): string {
  const s = status.toLowerCase()
  if (s === 'active') return C.g
  if (s === 'testing') return C.a
  if (s === 'blocked') return C.r
  return C.tx3 // planned / other
}

function Card({
  title,
  children,
  span = 1,
}: {
  title: string
  children: React.ReactNode
  span?: number
}) {
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        background: C.bg1,
        border: `1px solid ${C.bd}`,
        borderRadius: 6,
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: C.gold,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

export default function MetricsDashboard({
  finance,
  pilots,
  controlModules,
  subsystems,
  tasks,
}: MetricsDashboardProps) {
  const criticalTasks = tasks.filter(
    (t) =>
      t.priority.toLowerCase() === 'critical' ||
      t.status.toLowerCase() === 'blocked'
  )

  const totalRoi = pilots.reduce((sum, p) => sum + parseRoi(p.roi), 0)

  // Pad control modules to 10 slots (M0-M9)
  const modules: (typeof controlModules)[number][] = Array.from(
    { length: 10 },
    (_, i) => {
      const id = `M${i}`
      return (
        controlModules.find((m) => m.id === id) ?? {
          id,
          name: id,
          rate: '-',
          status: 'planned',
        }
      )
    }
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: 16,
        background: C.bg,
        color: C.tx,
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 13,
      }}
    >
      {/* Row 1: Finance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <Card title="Burn Rate">
          <div
            style={{
              ...mono,
              fontSize: 22,
              fontWeight: 700,
              color: finance.burn > 15000 ? C.r : C.tx,
            }}
          >
            ${fmt(finance.burn)}/mo
          </div>
          {finance.burn > 15000 && (
            <div style={{ fontSize: 10, color: C.r }}>Above $15K threshold</div>
          )}
        </Card>

        <Card title="Cash">
          <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: C.tx }}>
            ${fmt(finance.cash, 0)}
          </div>
        </Card>

        <Card title="Runway">
          <div
            style={{
              ...mono,
              fontSize: 22,
              fontWeight: 700,
              color:
                finance.runway < 3
                  ? C.r
                  : finance.runway < 6
                    ? C.a
                    : C.tx,
            }}
          >
            {finance.runway.toFixed(1)} mo
          </div>
          {finance.runway < 3 && (
            <div style={{ fontSize: 10, color: C.r }}>Critical runway</div>
          )}
          {finance.runway >= 3 && finance.runway < 6 && (
            <div style={{ fontSize: 10, color: C.a }}>Low runway</div>
          )}
        </Card>

        <Card title="BOM Cost">
          <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: C.tx }}>
            ${fmt(finance.bom)}/unit
          </div>
        </Card>
      </div>

      {/* Row 2: Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <Card title="Active Pilots">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ ...mono, fontSize: 22, fontWeight: 700 }}>
              {pilots.length}
            </span>
            <span style={{ fontSize: 11, color: C.tx2 }}>pilots</span>
          </div>
          {/* Mini bar chart of viability scores */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 3,
              height: 32,
              marginTop: 4,
            }}
          >
            {pilots.map((p, i) => (
              <div
                key={i}
                title={`${p.name}: ${p.viab}%`}
                style={{
                  flex: 1,
                  maxWidth: 18,
                  height: `${Math.max(p.viab, 5)}%`,
                  background: p.viab >= 70 ? C.g : p.viab >= 40 ? C.a : C.r,
                  borderRadius: 2,
                  minHeight: 2,
                }}
              />
            ))}
          </div>
        </Card>

        <Card title="Total Pipeline ROI">
          <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: C.tx }}>
            {totalRoi >= 0 ? '+' : ''}
            {totalRoi.toFixed(1)}x
          </div>
          <div style={{ fontSize: 11, color: C.tx2 }}>
            across {pilots.length} pilots
          </div>
        </Card>

        <Card title="Critical Tasks">
          <div
            style={{
              ...mono,
              fontSize: 22,
              fontWeight: 700,
              color: criticalTasks.length > 0 ? C.r : C.g,
            }}
          >
            {criticalTasks.length}
          </div>
          <div style={{ fontSize: 11, color: C.tx2 }}>
            critical + blocked
          </div>
        </Card>
      </div>

      {/* Row 3: Control Modules M0-M9 */}
      <Card title="Control Modules" span={1}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: 6,
          }}
        >
          {modules.map((m) => (
            <div
              key={m.id}
              style={{
                background: C.bg2,
                border: `1px solid ${C.bd}`,
                borderRadius: 4,
                padding: '8px 6px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: statusDot(m.status),
                }}
              />
              <div
                style={{
                  ...mono,
                  fontSize: 10,
                  fontWeight: 600,
                  color: C.tx,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {m.name}
              </div>
              <div style={{ ...mono, fontSize: 9, color: C.tx2 }}>{m.rate}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Row 4: Subsystem Readiness */}
      <Card title="Subsystem Readiness" span={1}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {subsystems.map((s) => (
            <div key={s.name}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 3,
                }}
              >
                <span style={{ fontSize: 12, color: C.tx }}>{s.name}</span>
                <span style={{ ...mono, fontSize: 11, color: C.tx2 }}>
                  {s.maturity}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: C.bg2,
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(s.maturity, 100)}%`,
                    background:
                      s.maturity >= 80
                        ? C.g
                        : s.maturity >= 50
                          ? C.a
                          : C.r,
                    borderRadius: 3,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
