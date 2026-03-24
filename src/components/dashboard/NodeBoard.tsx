'use client'
import { useState } from 'react'
import { C, statusColors, criticalityColors } from '@/lib/theme'
import type { ColumnDef, NodeConfig } from '@/lib/nodes'

interface NodeBoardProps {
  nodeConfig: NodeConfig
  rows: any[]
  onCellEdit?: (rowId: string, key: string, value: any) => void
  onAddRow?: () => void
  onDeleteRow?: (rowId: string) => void
  onRowClick?: (row: any) => void
}

function CellEditor({ value, type, onSave, onCancel }: { value: any; type: string; onSave: (v: any) => void; onCancel: () => void }) {
  const [v, setV] = useState(String(value ?? ''))

  if (type === 'status') {
    const opts = Object.keys(statusColors)
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 2 }}>
        {opts.map(o => (
          <span key={o} onClick={() => onSave(o)} style={{ padding: '2px 6px', fontSize: 10, borderRadius: 3, cursor: 'pointer', background: statusColors[o] + '20', color: statusColors[o], border: '1px solid ' + statusColors[o] + '40' }}>{o}</span>
        ))}
      </div>
    )
  }

  if (type === 'priority') {
    const opts = Object.keys(criticalityColors)
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 2 }}>
        {opts.map(o => (
          <span key={o} onClick={() => onSave(o)} style={{ padding: '2px 6px', fontSize: 10, borderRadius: 3, cursor: 'pointer', background: criticalityColors[o] + '20', color: criticalityColors[o], border: '1px solid ' + criticalityColors[o] + '40' }}>{o}</span>
        ))}
      </div>
    )
  }

  if (type === 'progress') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 2 }}>
        <input type="range" min={0} max={100} step={5} value={parseInt(v) || 0} onChange={e => setV(e.target.value)} style={{ flex: 1, accentColor: C.gold }} />
        <span style={{ fontSize: 11, color: C.gold, fontFamily: "'JetBrains Mono',monospace", minWidth: 28 }}>{v}%</span>
        <span onClick={() => onSave(parseInt(v) || 0)} style={{ cursor: 'pointer', color: C.g, fontSize: 10 }}>OK</span>
      </div>
    )
  }

  return (
    <input
      value={v}
      onChange={e => setV(e.target.value)}
      onKeyDown={e => { if (e.key === 'Enter') onSave(type === 'number' ? parseFloat(v) || 0 : v); if (e.key === 'Escape') onCancel() }}
      onBlur={() => onSave(type === 'number' ? parseFloat(v) || 0 : v)}
      autoFocus
      style={{ width: '100%', padding: '2px 4px', fontSize: 12, background: C.bg, border: '1px solid ' + C.gold + '40', borderRadius: 2, color: C.tx, outline: 'none', fontFamily: type === 'number' ? "'JetBrains Mono',monospace" : 'inherit', textAlign: type === 'number' ? 'right' : 'left' }}
    />
  )
}

function CellDisplay({ value, type, col }: { value: any; type: string; col: ColumnDef }) {
  if (type === 'progress') {
    const val = typeof value === 'number' ? value : parseInt(value) || 0
    const color = val >= 80 ? C.g : val >= 50 ? C.a : val < 30 ? C.r : C.gold
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ flex: 1, height: 6, background: C.bd, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: Math.min(val, 100) + '%', height: '100%', background: color, borderRadius: 3 }} />
        </div>
        <span style={{ fontSize: 11, color, fontFamily: "'JetBrains Mono',monospace", minWidth: 28, textAlign: 'right' }}>{val}%</span>
      </div>
    )
  }

  if (type === 'status') {
    const color = statusColors[value] || C.tx3
    return <span style={{ padding: '2px 8px', fontSize: 11, borderRadius: 3, background: color + '18', color, border: '1px solid ' + color + '30', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{value || '-'}</span>
  }

  if (type === 'priority') {
    const color = criticalityColors[value] || C.tx3
    return <span style={{ padding: '2px 8px', fontSize: 11, borderRadius: 3, background: color + '18', color, border: '1px solid ' + color + '30', fontWeight: 600, textTransform: 'uppercase' }}>{value || '-'}</span>
  }

  if (type === 'number') {
    return <span style={{ fontFamily: "'JetBrains Mono',monospace", color: C.tx, textAlign: 'right', display: 'block' }}>{value ?? '-'}</span>
  }

  if (type === 'person') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: C.gold + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: C.gold, fontWeight: 700, flexShrink: 0 }}>{(value || '?')[0]?.toUpperCase()}</div>
        <span style={{ fontSize: 12, color: C.tx }}>{value || '-'}</span>
      </div>
    )
  }

  if (type === 'date') {
    return <span style={{ fontSize: 12, color: C.tx2, fontFamily: "'JetBrains Mono',monospace" }}>{value || '-'}</span>
  }

  if (type === 'tags') {
    const tags = Array.isArray(value) ? value : []
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {tags.map((t: string, i: number) => <span key={i} style={{ padding: '1px 5px', fontSize: 10, borderRadius: 2, background: C.gold + '12', color: C.gold, border: '1px solid ' + C.gold + '20' }}>{t}</span>)}
      </div>
    )
  }

  return <span style={{ fontSize: 13, color: C.tx, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{String(value ?? '')}</span>
}

export function NodeBoard({ nodeConfig, rows, onCellEdit, onAddRow, onDeleteRow, onRowClick }: NodeBoardProps) {
  const [editingCell, setEditingCell] = useState<{ rowId: string; key: string } | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const cols = nodeConfig.columns

  return (
    <div style={{ borderRadius: 6, border: '1px solid ' + C.bd, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', background: C.bg1, borderBottom: '2px solid ' + C.gold + '20' }}>
        {cols.map(col => (
          <div key={col.key} style={{ width: col.width || 150, minWidth: col.width || 150, padding: '8px 10px', fontSize: 11, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.06em', borderRight: '1px solid ' + C.bd + '60' }}>
            {col.label}
          </div>
        ))}
        <div style={{ width: 36, minWidth: 36 }} />
      </div>

      {/* Rows */}
      {rows.map(row => {
        const rowId = row.id || row.name || String(Math.random())
        const isHovered = hoveredRow === rowId
        return (
          <div
            key={rowId}
            style={{ display: 'flex', borderBottom: '1px solid ' + C.bd + '40', background: isHovered ? C.bg2 : 'transparent', transition: 'background 0.1s', cursor: onRowClick ? 'pointer' : 'default' }}
            onMouseEnter={() => setHoveredRow(rowId)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {cols.map(col => {
              const isEditing = editingCell?.rowId === rowId && editingCell?.key === col.key
              return (
                <div
                  key={col.key}
                  style={{ width: col.width || 150, minWidth: col.width || 150, padding: '6px 10px', borderRight: '1px solid ' + C.bd + '30', display: 'flex', alignItems: 'center' }}
                  onClick={e => {
                    if (col.editable && onCellEdit && !isEditing) {
                      e.stopPropagation()
                      setEditingCell({ rowId, key: col.key })
                    } else if (onRowClick) {
                      onRowClick(row)
                    }
                  }}
                >
                  {isEditing ? (
                    <CellEditor
                      value={row[col.key]}
                      type={col.type}
                      onSave={v => { onCellEdit?.(rowId, col.key, v); setEditingCell(null) }}
                      onCancel={() => setEditingCell(null)}
                    />
                  ) : (
                    <CellDisplay value={row[col.key]} type={col.type} col={col} />
                  )}
                </div>
              )
            })}
            <div style={{ width: 36, minWidth: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isHovered && onDeleteRow && (
                <span onClick={e => { e.stopPropagation(); onDeleteRow(rowId) }} style={{ cursor: 'pointer', color: C.r, fontSize: 12, opacity: 0.6 }}>x</span>
              )}
            </div>
          </div>
        )
      })}

      {/* Empty state */}
      {rows.length === 0 && (
        <div style={{ padding: '20px', textAlign: 'center', color: C.tx3, fontSize: 13 }}>No data yet</div>
      )}

      {/* Add row */}
      {onAddRow && (
        <div onClick={onAddRow} style={{ padding: '8px 10px', cursor: 'pointer', fontSize: 12, color: C.gold, borderTop: '1px solid ' + C.bd + '40', display: 'flex', alignItems: 'center', gap: 4 }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.bg2 }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
          + Add row
        </div>
      )}
    </div>
  )
}
