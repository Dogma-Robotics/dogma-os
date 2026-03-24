'use client'
import { C } from '@/lib/theme'

export function ProgressBar({ val, w, color }: { val: number; w?: number; color?: string }) {
  return (
    <div style={{ width: w || 60, height: 6, background: C.bd, borderRadius: 3, overflow: 'hidden', display: 'inline-block', verticalAlign: 'middle' }}>
      <div style={{ width: Math.min(val || 0, 100) + '%', height: '100%', background: color || C.gold, borderRadius: 3 }} />
    </div>
  )
}
