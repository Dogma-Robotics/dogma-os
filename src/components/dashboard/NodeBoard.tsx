'use client'
import { useState, useEffect, useCallback } from 'react'
import { C, statusColors, criticalityColors } from '@/lib/theme'
import type { ColumnDef, NodeConfig } from '@/lib/nodes'

interface Comment {
  id: string
  entity_type: string
  entity_id: string
  author: string
  text: string
  created_at: string
}

interface NodeBoardProps {
  nodeConfig: NodeConfig
  rows: any[]
  onCellEdit?: (rowId: string, key: string, value: any) => void
  onAddRow?: () => void
  onDeleteRow?: (rowId: string) => void
  onRowClick?: (row: any) => void
  onComment?: (entityType: string, entityId: string, text: string) => void
}

// ─── Sorting ──────────────────────────────────────────────

type SortDir = 'asc' | 'desc' | null
interface SortState { key: string; dir: SortDir }

function sortRows(rows: any[], sort: SortState): any[] {
  if (!sort.dir) return rows
  const sorted = [...rows]
  sorted.sort((a, b) => {
    let va = a[sort.key], vb = b[sort.key]
    if (va == null) va = ''
    if (vb == null) vb = ''
    if (typeof va === 'number' && typeof vb === 'number') return sort.dir === 'asc' ? va - vb : vb - va
    return sort.dir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va))
  })
  return sorted
}

// ─── Cell Editor ──────────────────────────────────────────

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

// ─── Cell Display ─────────────────────────────────────────

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

// ─── Criticality Selector ──────────────────────────────────

function CriticalitySelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const levels = ['critical', 'high', 'medium', 'low']
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {levels.map(l => {
        const color = criticalityColors[l]
        const active = value === l
        return (
          <span
            key={l}
            onClick={() => onChange(l)}
            style={{
              padding: '3px 10px', fontSize: 11, borderRadius: 4, cursor: 'pointer',
              background: active ? color + '30' : 'transparent',
              color: active ? color : C.tx3,
              border: '1px solid ' + (active ? color : C.bd),
              fontWeight: active ? 700 : 400,
              textTransform: 'uppercase', letterSpacing: '0.04em',
              transition: 'all 0.15s',
            }}
          >
            {l}
          </span>
        )
      })}
    </div>
  )
}

// ─── Owner Dropdown ────────────────────────────────────────

function OwnerDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [v, setV] = useState(value || '')

  if (!editing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => setEditing(true)}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: C.gold + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: C.gold, fontWeight: 700 }}>
          {(value || '?')[0]?.toUpperCase()}
        </div>
        <span style={{ fontSize: 12, color: C.tx }}>{value || 'Unassigned'}</span>
        <span style={{ fontSize: 10, color: C.tx3, marginLeft: 2 }}>edit</span>
      </div>
    )
  }

  return (
    <input
      value={v}
      onChange={e => setV(e.target.value)}
      onKeyDown={e => { if (e.key === 'Enter') { onChange(v); setEditing(false) } if (e.key === 'Escape') setEditing(false) }}
      onBlur={() => { onChange(v); setEditing(false) }}
      autoFocus
      placeholder="Owner name..."
      style={{ padding: '4px 8px', fontSize: 12, background: C.bg, border: '1px solid ' + C.gold + '40', borderRadius: 3, color: C.tx, outline: 'none', width: 160 }}
    />
  )
}

// ─── Comment Thread ────────────────────────────────────────

function CommentThread({ entityType, entityId, onComment }: { entityType: string; entityId: string; onComment?: (entityType: string, entityId: string, text: string) => void }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [newText, setNewText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?entity_type=${encodeURIComponent(entityType)}&entity_id=${encodeURIComponent(entityId)}`)
      if (res.ok) {
        const data = await res.json()
        setComments(data.comments || [])
      }
    } catch {}
    setLoading(false)
  }, [entityType, entityId])

  useEffect(() => { fetchComments() }, [fetchComments])

  const handleSubmit = async () => {
    if (!newText.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity_type: entityType, entity_id: entityId, author: 'Jero', text: newText.trim() }),
      })
      if (res.ok) {
        const data = await res.json()
        setComments(prev => [...prev, data.comment])
        setNewText('')
        onComment?.(entityType, entityId, newText.trim())
      }
    } catch {}
    setSubmitting(false)
  }

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Comments ({comments.length})
      </div>

      {loading && <div style={{ fontSize: 11, color: C.tx3, padding: '4px 0' }}>Loading...</div>}

      {comments.map(c => (
        <div key={c.id} style={{ padding: '6px 0', borderBottom: '1px solid ' + C.bd + '30' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: C.gold + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: C.gold, fontWeight: 700 }}>
              {(c.author || '?')[0]?.toUpperCase()}
            </div>
            <span style={{ fontSize: 11, color: C.tx, fontWeight: 600 }}>{c.author}</span>
            <span style={{ fontSize: 10, color: C.tx3, fontFamily: "'JetBrains Mono',monospace" }}>
              {c.created_at ? new Date(c.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
            </span>
          </div>
          <div style={{ fontSize: 12, color: C.tx, paddingLeft: 22, lineHeight: 1.4 }}>{c.text}</div>
        </div>
      ))}

      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <input
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit() }}
          placeholder="Add a comment..."
          style={{ flex: 1, padding: '6px 8px', fontSize: 12, background: C.bg, border: '1px solid ' + C.bd, borderRadius: 4, color: C.tx, outline: 'none' }}
        />
        <button
          onClick={handleSubmit}
          disabled={submitting || !newText.trim()}
          style={{
            padding: '6px 12px', fontSize: 11, borderRadius: 4, cursor: 'pointer',
            background: newText.trim() ? C.gold + '20' : 'transparent',
            color: newText.trim() ? C.gold : C.tx3,
            border: '1px solid ' + (newText.trim() ? C.gold + '40' : C.bd),
            fontWeight: 600,
          }}
        >
          {submitting ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}

// ─── Detail Panel (expanded row) ──────────────────────────

function DetailPanel({ row, nodeConfig, onCellEdit, onComment }: { row: any; nodeConfig: NodeConfig; onCellEdit?: (rowId: string, key: string, value: any) => void; onComment?: (entityType: string, entityId: string, text: string) => void }) {
  const rowId = row.id || row.name || ''
  const entityType = nodeConfig.dbTable
  const [description, setDescription] = useState(row.description || '')
  const [descDirty, setDescDirty] = useState(false)

  const saveDescription = () => {
    if (descDirty && onCellEdit) {
      onCellEdit(rowId, 'description', description)
      setDescDirty(false)
    }
  }

  return (
    <div style={{ padding: '12px 16px', background: C.bg1, borderBottom: '2px solid ' + C.gold + '10', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Description */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Description</div>
          <textarea
            value={description}
            onChange={e => { setDescription(e.target.value); setDescDirty(true) }}
            onBlur={saveDescription}
            rows={3}
            placeholder="Add description..."
            style={{ width: '100%', padding: '6px 8px', fontSize: 12, background: C.bg, border: '1px solid ' + C.bd, borderRadius: 4, color: C.tx, outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }}
          />
        </div>

        {/* Owner */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Owner</div>
          <OwnerDropdown value={row.owner || ''} onChange={v => onCellEdit?.(rowId, 'owner', v)} />
        </div>

        {/* Criticality */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Criticality</div>
          <CriticalitySelector value={row.criticality || row.priority || 'medium'} onChange={v => onCellEdit?.(rowId, 'criticality', v)} />
        </div>

        {/* Activity timestamp */}
        <div style={{ fontSize: 11, color: C.tx3, fontFamily: "'JetBrains Mono',monospace" }}>
          {row.updated_at ? 'Updated: ' + new Date(row.updated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
          {row.created_at ? (row.updated_at ? ' | ' : '') + 'Created: ' + new Date(row.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
        </div>
      </div>

      {/* Right column: Comments */}
      <div>
        <CommentThread entityType={entityType} entityId={rowId} onComment={onComment} />
      </div>
    </div>
  )
}

// ─── Sort Arrow ───────────────────────────────────────────

function SortArrow({ dir }: { dir: SortDir }) {
  if (!dir) return <span style={{ color: C.tx3, fontSize: 9, marginLeft: 3, opacity: 0.4 }}>&#9650;&#9660;</span>
  if (dir === 'asc') return <span style={{ color: C.gold, fontSize: 9, marginLeft: 3 }}>&#9650;</span>
  return <span style={{ color: C.gold, fontSize: 9, marginLeft: 3 }}>&#9660;</span>
}

// ─── Main Component ───────────────────────────────────────

export function NodeBoard({ nodeConfig, rows, onCellEdit, onAddRow, onDeleteRow, onRowClick, onComment }: NodeBoardProps) {
  const [editingCell, setEditingCell] = useState<{ rowId: string; key: string } | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [sort, setSort] = useState<SortState>({ key: '', dir: null })
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  const cols = nodeConfig.columns
  const sortedRows = sort.dir ? sortRows(rows, sort) : rows

  const toggleSort = (key: string) => {
    setSort(prev => {
      if (prev.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return { key: '', dir: null }
    })
  }

  const toggleExpand = (rowId: string) => {
    setExpandedRow(prev => prev === rowId ? null : rowId)
  }

  return (
    <div style={{ borderRadius: 6, border: '1px solid ' + C.bd, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', background: C.bg1, borderBottom: '2px solid ' + C.gold + '20' }}>
        {cols.map(col => (
          <div
            key={col.key}
            onClick={() => toggleSort(col.key)}
            style={{
              width: col.width || 150, minWidth: col.width || 150,
              padding: '8px 10px', fontSize: 11, fontWeight: 700,
              color: C.gold, textTransform: 'uppercase', letterSpacing: '0.06em',
              borderRight: '1px solid ' + C.bd + '60',
              cursor: 'pointer', userSelect: 'none',
              display: 'flex', alignItems: 'center',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.bg2 }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            {col.label}
            <SortArrow dir={sort.key === col.key ? sort.dir : null} />
          </div>
        ))}
        <div style={{ width: 36, minWidth: 36 }} />
      </div>

      {/* Rows */}
      {sortedRows.map(row => {
        const rowId = row.id || row.name || String(Math.random())
        const isHovered = hoveredRow === rowId
        const isExpanded = expandedRow === rowId
        const isSelected = selectedRows.has(rowId)

        return (
          <div key={rowId}>
            <div
              style={{
                display: 'flex',
                borderBottom: isExpanded ? 'none' : '1px solid ' + C.bd + '40',
                background: isExpanded ? C.bg2 : isSelected ? C.gold + '08' : isHovered ? C.bg2 : 'transparent',
                transition: 'background 0.1s',
                cursor: 'pointer',
                borderLeft: isExpanded ? '2px solid ' + C.gold + '60' : '2px solid transparent',
              }}
              onMouseEnter={() => setHoveredRow(rowId)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => {
                toggleExpand(rowId)
                onRowClick?.(row)
              }}
            >
              {cols.map(col => {
                const isEditing = editingCell?.rowId === rowId && editingCell?.key === col.key
                return (
                  <div
                    key={col.key}
                    style={{
                      width: col.width || 150, minWidth: col.width || 150,
                      padding: '6px 10px',
                      borderRight: '1px solid ' + C.bd + '30',
                      display: 'flex', alignItems: 'center',
                    }}
                    onClick={e => {
                      if (col.editable && onCellEdit && !isEditing) {
                        e.stopPropagation()
                        setEditingCell({ rowId, key: col.key })
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
              <div style={{ width: 36, minWidth: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                {isHovered && onDeleteRow && (
                  <span
                    onClick={e => { e.stopPropagation(); onDeleteRow(rowId) }}
                    style={{ cursor: 'pointer', color: C.r, fontSize: 12, opacity: 0.6, lineHeight: 1 }}
                    title="Delete row"
                  >
                    x
                  </span>
                )}
                <span style={{ fontSize: 10, color: isExpanded ? C.gold : C.tx3, opacity: isHovered || isExpanded ? 1 : 0, transition: 'opacity 0.15s' }}>
                  {isExpanded ? '\u25B4' : '\u25BE'}
                </span>
              </div>
            </div>

            {/* Expanded detail panel */}
            {isExpanded && (
              <DetailPanel
                row={row}
                nodeConfig={nodeConfig}
                onCellEdit={onCellEdit}
                onComment={onComment}
              />
            )}
          </div>
        )
      })}

      {/* Empty state */}
      {rows.length === 0 && (
        <div style={{ padding: '20px', textAlign: 'center', color: C.tx3, fontSize: 13 }}>No data yet</div>
      )}

      {/* Add row */}
      {onAddRow && (
        <div
          onClick={onAddRow}
          style={{ padding: '8px 10px', cursor: 'pointer', fontSize: 12, color: C.gold, borderTop: '1px solid ' + C.bd + '40', display: 'flex', alignItems: 'center', gap: 4, transition: 'background 0.1s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.bg2 }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          + Add row
        </div>
      )}
    </div>
  )
}
