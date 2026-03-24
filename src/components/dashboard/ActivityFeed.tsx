'use client'

import { C } from '@/lib/theme'

interface ActivityEvent {
  id: string
  type: 'edit' | 'create' | 'delete' | 'comment' | 'status_change' | 'automation'
  nodeId: string
  nodeLabel: string
  user: string
  description: string
  timestamp: string
}

interface ActivityFeedProps {
  events: ActivityEvent[]
  maxItems?: number
}

const dotColors: Record<ActivityEvent['type'], string> = {
  edit: '#C8A74B',
  create: '#2D7A5D',
  delete: '#8A3333',
  comment: '#3A5A7A',
  status_change: '#A78530',
  automation: '#3A7A7A',
}

const typeLabels: Record<ActivityEvent['type'], string> = {
  edit: 'Edited',
  create: 'Created',
  delete: 'Deleted',
  comment: 'Comment',
  status_change: 'Status',
  automation: 'Auto',
}

function relativeTime(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(ts).toLocaleDateString()
}

export default function ActivityFeed({ events, maxItems = 50 }: ActivityFeedProps) {
  const sorted = [...events]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxItems)

  return (
    <div style={{ background: C.bg1, border: `1px solid ${C.bd}`, borderRadius: 10, padding: 16 }}>
      <div style={{ color: C.gold, fontWeight: 600, fontSize: 14, letterSpacing: 0.3, marginBottom: 14 }}>
        Activity
      </div>

      {sorted.length === 0 && (
        <div style={{ color: C.tx3, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>
          No activity yet
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {sorted.map((ev, i) => {
          const color = dotColors[ev.type]
          const isLast = i === sorted.length - 1
          return (
            <div key={ev.id} style={{ display: 'flex', gap: 10, minHeight: 44 }}>
              {/* Timeline column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16, flexShrink: 0 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: color,
                    marginTop: 4,
                    flexShrink: 0,
                    boxShadow: `0 0 6px ${color}44`,
                  }}
                />
                {!isLast && (
                  <div style={{ width: 1, flex: 1, background: C.bd, marginTop: 2 }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: color,
                      background: `${color}18`,
                      padding: '1px 6px',
                      borderRadius: 3,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    {typeLabels[ev.type]}
                  </span>
                  <span style={{ color: C.tx, fontSize: 13, fontWeight: 500 }}>{ev.nodeLabel}</span>
                </div>
                <div style={{ color: C.tx2, fontSize: 12, lineHeight: 1.4 }}>{ev.description}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                  <span style={{ color: C.tx3, fontSize: 11 }}>{ev.user}</span>
                  <span style={{ color: C.tx3, fontSize: 11 }}>{relativeTime(ev.timestamp)}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
