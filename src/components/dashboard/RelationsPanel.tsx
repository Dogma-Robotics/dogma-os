'use client'

import { useState } from 'react'
import { C } from '@/lib/theme'

interface Relation {
  id: string
  sourceId: string
  targetId: string
  type: string
  label?: string
}

interface RelationsPanelProps {
  nodeId: string
  relations: Relation[]
  allNodes: { id: string; label: string; icon: string }[]
  onAddRelation: (r: Omit<Relation, 'id'>) => void
  onDeleteRelation: (id: string) => void
  canEdit: boolean
}

const RELATION_TYPES = [
  'blocks',
  'requires',
  'depends_on',
  'affects',
  'extends',
  'version_of',
  'gates',
  'enables',
  'conflicts_with',
] as const

const typeColors: Record<string, string> = {
  blocks: '#8A3333',
  requires: '#A78530',
  depends_on: '#3A5A7A',
  affects: '#C8A74B',
  extends: '#3A7A7A',
  version_of: '#6E6A84',
  gates: '#8A3333',
  enables: '#2D7A5D',
  conflicts_with: '#8A3333',
}

export default function RelationsPanel({
  nodeId,
  relations,
  allNodes,
  onAddRelation,
  onDeleteRelation,
  canEdit,
}: RelationsPanelProps) {
  const [showForm, setShowForm] = useState(false)
  const [targetId, setTargetId] = useState('')
  const [relType, setRelType] = useState<string>(RELATION_TYPES[0])

  const grouped = relations.reduce<Record<string, Relation[]>>((acc, rel) => {
    const key = rel.type
    if (!acc[key]) acc[key] = []
    acc[key].push(rel)
    return acc
  }, {})

  const handleSave = () => {
    if (!targetId) return
    onAddRelation({ sourceId: nodeId, targetId, type: relType, label: '' })
    setTargetId('')
    setRelType(RELATION_TYPES[0])
    setShowForm(false)
  }

  const getNodeLabel = (id: string) =>
    allNodes.find((n) => n.id === id)?.label ?? id

  const getNodeIcon = (id: string) =>
    allNodes.find((n) => n.id === id)?.icon ?? '●'

  const isOutgoing = (rel: Relation) => rel.sourceId === nodeId

  const selectStyle: React.CSSProperties = {
    background: C.bg2,
    border: `1px solid ${C.bd}`,
    color: C.tx,
    padding: '6px 10px',
    borderRadius: 6,
    fontSize: 13,
    outline: 'none',
    flex: 1,
  }

  return (
    <div style={{ background: C.bg1, border: `1px solid ${C.bd}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ color: C.gold, fontWeight: 600, fontSize: 14, letterSpacing: 0.3 }}>
          Relations
        </span>
        {canEdit && (
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: showForm ? C.bg3 : 'transparent',
              border: `1px solid ${C.bd}`,
              color: C.gold,
              padding: '4px 12px',
              borderRadius: 6,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {showForm ? 'Cancel' : '+ Add Relation'}
          </button>
        )}
      </div>

      {showForm && (
        <div
          style={{
            background: C.bg2,
            border: `1px solid ${C.bd}`,
            borderRadius: 8,
            padding: 12,
            marginBottom: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <select value={targetId} onChange={(e) => setTargetId(e.target.value)} style={selectStyle}>
              <option value="">Select target node...</option>
              {allNodes
                .filter((n) => n.id !== nodeId)
                .map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.icon} {n.label}
                  </option>
                ))}
            </select>
            <select value={relType} onChange={(e) => setRelType(e.target.value)} style={selectStyle}>
              {RELATION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSave}
            disabled={!targetId}
            style={{
              background: targetId ? C.gold : C.bg3,
              color: targetId ? C.bg : C.tx3,
              border: 'none',
              padding: '6px 16px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: targetId ? 'pointer' : 'default',
              alignSelf: 'flex-end',
            }}
          >
            Save
          </button>
        </div>
      )}

      {Object.keys(grouped).length === 0 && (
        <div style={{ color: C.tx3, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>
          No relations yet
        </div>
      )}

      {Object.entries(grouped).map(([type, rels]) => (
        <div key={type} style={{ marginBottom: 12 }}>
          <div
            style={{
              color: typeColors[type] ?? C.tx2,
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              marginBottom: 6,
            }}
          >
            {type.replace(/_/g, ' ')}
          </div>
          {rels.map((rel) => (
            <div
              key={rel.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: 6,
                background: C.bg2,
                marginBottom: 4,
              }}
            >
              <span style={{ color: typeColors[type] ?? C.tx2, fontSize: 14, flexShrink: 0 }}>
                {isOutgoing(rel) ? '→' : '←'}
              </span>
              <span style={{ fontSize: 13, flexShrink: 0 }}>
                {getNodeIcon(isOutgoing(rel) ? rel.targetId : rel.sourceId)}
              </span>
              <span style={{ color: C.tx, fontSize: 13, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {getNodeLabel(isOutgoing(rel) ? rel.targetId : rel.sourceId)}
              </span>
              <span
                style={{
                  background: `${typeColors[type] ?? C.tx3}22`,
                  color: typeColors[type] ?? C.tx2,
                  fontSize: 10,
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {type}
              </span>
              {canEdit && (
                <button
                  onClick={() => onDeleteRelation(rel.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: C.tx3,
                    cursor: 'pointer',
                    fontSize: 14,
                    padding: '0 4px',
                    flexShrink: 0,
                  }}
                  title="Remove relation"
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
