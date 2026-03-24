'use client'
import { useState } from 'react'
import { C, statusColors } from '@/lib/theme'

const STATUSES = [
  'planned', 'active', 'in_progress', 'testing', 'review', 'blocked', 'done', 'dev', 'validated',
] as const

interface KanbanViewProps {
  rows: any[]
  statusKey: string
  labelKey: string
  onStatusChange?: (rowId: string, newStatus: string) => void
}

export default function KanbanView({ rows, statusKey, labelKey, onStatusChange }: KanbanViewProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const grouped = STATUSES.reduce<Record<string, any[]>>((acc, s) => {
    acc[s] = rows.filter((r) => (r[statusKey] ?? '').toLowerCase().replace(/\s+/g, '_') === s)
    return acc
  }, {} as any)

  const statusColor = (s: string) => statusColors[s] ?? C.tx3

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        overflowX: 'auto',
        padding: '12px 0',
        minHeight: 320,
      }}
    >
      {STATUSES.map((status) => (
        <div
          key={status}
          style={{
            minWidth: 220,
            maxWidth: 260,
            flex: '0 0 240px',
            background: C.bg1,
            border: `1px solid ${C.bd}`,
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Column header */}
          <div
            style={{
              padding: '10px 12px 8px',
              borderBottom: `1px solid ${C.bd}`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: statusColor(status),
                flexShrink: 0,
              }}
            />
            <span style={{ color: C.tx, fontSize: 13, fontWeight: 600, textTransform: 'capitalize' }}>
              {status.replace(/_/g, ' ')}
            </span>
            <span
              style={{
                marginLeft: 'auto',
                color: C.tx3,
                fontSize: 11,
                background: C.bg2,
                borderRadius: 4,
                padding: '1px 6px',
              }}
            >
              {grouped[status].length}
            </span>
          </div>

          {/* Cards */}
          <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto', flex: 1 }}>
            {grouped[status].length === 0 && (
              <div style={{ color: C.tx3, fontSize: 11, textAlign: 'center', padding: '16px 0' }}>No items</div>
            )}
            {grouped[status].map((row) => {
              const id = row.id ?? row._id ?? row[labelKey]
              const isOpen = openDropdown === id
              return (
                <div
                  key={id}
                  style={{
                    background: C.bg2,
                    border: `1px solid ${C.bd}`,
                    borderRadius: 6,
                    padding: '10px 10px 8px',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpenDropdown(isOpen ? null : id)}
                >
                  {/* Label */}
                  <div style={{ color: C.tx, fontSize: 13, fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>
                    {row[labelKey] ?? 'Untitled'}
                  </div>

                  {/* Description */}
                  {row.description && (
                    <div
                      style={{
                        color: C.tx2,
                        fontSize: 11,
                        lineHeight: 1.4,
                        marginBottom: 6,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {row.description}
                    </div>
                  )}

                  {/* Criticality badge */}
                  {row.criticality && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        padding: '2px 6px',
                        borderRadius: 3,
                        background: `${statusColor(row.criticality) || C.tx3}22`,
                        color: statusColor(row.criticality) || C.tx2,
                        border: `1px solid ${statusColor(row.criticality) || C.tx3}44`,
                      }}
                    >
                      {row.criticality}
                    </span>
                  )}

                  {/* Status dropdown */}
                  {isOpen && onStatusChange && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 50,
                        marginTop: 4,
                        background: C.bg1,
                        border: `1px solid ${C.bd}`,
                        borderRadius: 6,
                        padding: 4,
                        minWidth: 160,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ color: C.tx3, fontSize: 10, padding: '4px 8px', textTransform: 'uppercase' }}>
                        Move to
                      </div>
                      {STATUSES.filter((s) => s !== status).map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            onStatusChange(id, s)
                            setOpenDropdown(null)
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            width: '100%',
                            padding: '6px 8px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            color: C.tx,
                            fontSize: 12,
                            textAlign: 'left',
                            textTransform: 'capitalize',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = C.bg2)}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor(s) }} />
                          {s.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
