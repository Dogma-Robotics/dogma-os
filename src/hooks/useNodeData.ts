'use client'
import { useState, useEffect, useCallback } from 'react'
import { SEED_DATA } from '@/lib/seed-data'

export function useNodeData(nodeId: string | null) {
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRows = useCallback(async () => {
    if (!nodeId) return
    setLoading(true)
    try {
      const res = await fetch('/api/knowledge?type=rows&node_id=' + encodeURIComponent(nodeId))
      const data = await res.json()
      if (data.rows && data.rows.length > 0) {
        setRows(data.rows)
        setLoading(false)
        return
      }
    } catch (e) {}
    // Fallback to seed data
    setRows(SEED_DATA[nodeId] || [])
    setLoading(false)
  }, [nodeId])

  useEffect(() => { fetchRows() }, [fetchRows])

  const addRow = useCallback(async (row: any) => {
    const newRow = { ...row, id: row.id || 'row_' + Date.now() }
    setRows(prev => [...prev, newRow])
    // Try to persist to Supabase
    try {
      await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'row', node_id: nodeId, ...newRow })
      })
    } catch (e) {}
  }, [nodeId])

  const updateRow = useCallback(async (rowId: string, key: string, value: any) => {
    setRows(prev => prev.map(r => r.id === rowId ? { ...r, [key]: value } : r))
    try {
      await fetch('/api/knowledge', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'row', id: rowId, [key]: value })
      })
    } catch (e) {}
  }, [])

  const deleteRow = useCallback(async (rowId: string) => {
    setRows(prev => prev.filter(r => r.id !== rowId))
    try {
      await fetch('/api/knowledge', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'row', id: rowId })
      })
    } catch (e) {}
  }, [])

  return { rows, loading, addRow, updateRow, deleteRow, refetch: fetchRows }
}
