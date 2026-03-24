'use client'
import { useState, useEffect, useRef } from 'react'
import { C } from '@/lib/theme'

export function Btn({ children, onClick, v }: { children: React.ReactNode; onClick?: () => void; v?: string }) {
  const m: Record<string, string[]> = { default: [C.bg3, C.tx2, C.bd], gold: [C.gD, C.gold, C.gold + '22'], success: ['rgba(45,122,93,0.08)', C.g, C.g + '22'] }
  const s = m[v || 'default'] || m['default']
  return <button onClick={onClick} style={{ padding: '6px 16px', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', background: s[0], color: s[1], border: '1px solid ' + s[2], borderRadius: 3, cursor: 'pointer' }}>{children}</button>
}

export function Sec({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginTop: 14, marginBottom: 6, borderBottom: '1px solid ' + C.bd, paddingBottom: 4 }}>{children}</div>
}

export function Row({ label, value, color, canEdit, onSave }: { label: string; value: any; color?: string; canEdit?: boolean; onSave?: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(String(value || ''))
  useEffect(() => { setVal(String(value || '')) }, [value])
  const save = () => { if (onSave) onSave(val); setEditing(false) }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 14, borderBottom: '1px solid ' + C.bd + '40', gap: 8 }}>
      <span style={{ color: C.tx2, flexShrink: 0 }}>{label}</span>
      {editing ? (
        <div style={{ display: 'flex', gap: 3, flex: 1, justifyContent: 'flex-end' }}>
          <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false) }} autoFocus style={{ width: '100%', maxWidth: 180, padding: '2px 6px', fontSize: 13, background: C.bg, border: '1px solid ' + C.gold + '40', borderRadius: 2, color: C.tx, outline: 'none', fontFamily: "'JetBrains Mono',monospace", textAlign: 'right' }} />
          <span onClick={save} style={{ cursor: 'pointer', color: C.g, fontSize: 11 }}>OK</span>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: color || C.tx, fontFamily: "'JetBrains Mono',monospace" }}>{value}</span>
          {canEdit && onSave && <span onClick={() => setEditing(true)} style={{ cursor: 'pointer', color: C.tx3, fontSize: 10, opacity: 0.6 }}>&#9998;</span>}
        </div>
      )}
    </div>
  )
}

export function EText({ text, canEdit, onSave }: { text: string; canEdit?: boolean; onSave?: (v: string) => void }) {
  const [ed, setEd] = useState(false)
  const [v, setV] = useState(text || '')
  useEffect(() => { setV(text || '') }, [text])
  if (ed) return (
    <div>
      <textarea value={v} onChange={e => setV(e.target.value)} rows={3} style={{ width: '100%', padding: '6px 8px', fontSize: 13, background: C.bg, border: '1px solid ' + C.gold + '40', borderRadius: 3, color: C.tx, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
      <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
        <span onClick={() => { if (onSave) onSave(v); setEd(false) }} style={{ cursor: 'pointer', color: C.g, fontSize: 12 }}>Save</span>
        <span onClick={() => { setV(text || ''); setEd(false) }} style={{ cursor: 'pointer', color: C.tx3, fontSize: 12 }}>Cancel</span>
      </div>
    </div>
  )
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ fontSize: 14, color: C.tx, lineHeight: 1.6 }}>{text}</div>
      {canEdit && <span onClick={() => setEd(true)} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: C.tx3, fontSize: 10, opacity: 0.6 }}>&#9998;</span>}
    </div>
  )
}

function EListItem({ text, color, canEdit, onEdit, onRemove }: { text: string; color?: string; canEdit?: boolean; onEdit: (v: string) => void; onRemove: () => void }) {
  const [ed, setEd] = useState(false)
  const [v, setV] = useState(text)
  useEffect(() => { setV(text) }, [text])
  if (ed) return (
    <div style={{ display: 'flex', gap: 3, padding: '2px 0' }}>
      <input value={v} onChange={e => setV(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { onEdit(v); setEd(false) } if (e.key === 'Escape') setEd(false) }} autoFocus style={{ flex: 1, padding: '2px 6px', fontSize: 13, background: C.bg, border: '1px solid ' + C.gold + '40', borderRadius: 2, color: C.tx, outline: 'none' }} />
      <span onClick={() => { onEdit(v); setEd(false) }} style={{ cursor: 'pointer', color: C.g, fontSize: 11 }}>OK</span>
    </div>
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 0', fontSize: 14, color: color || C.tx }}>
      <span style={{ flex: 1 }}>- {text}</span>
      {canEdit && <span onClick={() => setEd(true)} style={{ cursor: 'pointer', color: C.tx3, fontSize: 10, opacity: 0.6 }}>&#9998;</span>}
      {canEdit && <span onClick={onRemove} style={{ cursor: 'pointer', color: C.r, fontSize: 10, opacity: 0.6 }}>x</span>}
    </div>
  )
}

export function EList({ items, canEdit, onUpdate, color }: { items: string[]; canEdit?: boolean; onUpdate?: (arr: string[]) => void; color?: string }) {
  const [adding, setAdding] = useState(false)
  const [nv, setNv] = useState('')
  const addItem = () => { if (nv.trim() && onUpdate) { onUpdate(items.concat([nv.trim()])); setNv(''); setAdding(false) } }
  const removeItem = (idx: number) => { if (onUpdate) { const a = items.slice(); a.splice(idx, 1); onUpdate(a) } }
  const editItem = (idx: number, val: string) => { if (onUpdate) { const a = items.slice(); a[idx] = val; onUpdate(a) } }
  return (
    <div>
      {(items || []).map((x, i) => <EListItem key={i} text={x} color={color} canEdit={canEdit} onEdit={v => editItem(i, v)} onRemove={() => removeItem(i)} />)}
      {canEdit && !adding && <div onClick={() => setAdding(true)} style={{ fontSize: 12, color: C.gold, cursor: 'pointer', padding: '3px 0', opacity: 0.7 }}>+ Add item</div>}
      {canEdit && adding && (
        <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
          <input value={nv} onChange={e => setNv(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addItem(); if (e.key === 'Escape') setAdding(false) }} autoFocus placeholder="New item..." style={{ flex: 1, padding: '3px 6px', fontSize: 13, background: C.bg, border: '1px solid ' + C.gold + '40', borderRadius: 2, color: C.tx, outline: 'none' }} />
          <span onClick={addItem} style={{ cursor: 'pointer', color: C.g, fontSize: 12 }}>OK</span>
        </div>
      )}
    </div>
  )
}

export function EditTitle({ text, canEdit, onSave }: { text: string; canEdit?: boolean; onSave?: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(text)
  useEffect(() => { setVal(text) }, [text])
  if (!canEdit) return <div style={{ fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 8 }}>{text}</div>
  if (editing) return (
    <div style={{ marginBottom: 8 }}>
      <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && val.trim()) { onSave?.(val.trim()); setEditing(false) } if (e.key === 'Escape') { setVal(text); setEditing(false) } }} autoFocus style={{ width: '100%', fontSize: 20, fontWeight: 700, padding: '4px 8px', background: C.bg, border: '1px solid ' + C.gold + '40', borderRadius: 4, color: C.gold, outline: 'none', fontFamily: 'inherit' }} />
    </div>
  )
  return (
    <div style={{ fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setEditing(true)}>
      {text}<span style={{ fontSize: 11, color: C.tx3, opacity: 0.5 }}>✏️</span>
    </div>
  )
}

export function NoteBox({ notes, onAdd }: { notes: { t: string; by: string; at: string }[]; onAdd: (t: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const go = () => { if (ref.current && ref.current.value.trim()) { onAdd(ref.current.value.trim()); ref.current.value = '' } }
  return (
    <div style={{ marginTop: 10 }}>
      <Sec>Notes ({(notes || []).length})</Sec>
      {(notes || []).map((n, i) => (
        <div key={i} style={{ padding: '6px 8px', background: C.bg, borderRadius: 3, marginBottom: 3, borderLeft: '2px solid ' + C.gold + '20', fontSize: 13, color: C.tx, lineHeight: 1.5 }}>
          {n.t}
          <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>{n.by} - {n.at}</div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
        <input ref={ref} placeholder="Add note..." style={{ flex: 1, padding: '6px 10px', fontSize: 13, background: C.bg, border: '1px solid ' + C.bd, borderRadius: 3, color: C.tx, outline: 'none' }} onKeyDown={e => { if (e.key === 'Enter') go() }} />
        <Btn v="gold" onClick={go}>+</Btn>
      </div>
    </div>
  )
}
