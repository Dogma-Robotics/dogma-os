'use client'
import { C, statusColors, criticalityColors } from '@/lib/theme'

function dc(s: string) {
  return 'pass validated active resolved low done'.split(' ').indexOf(s) >= 0 ? C.g
    : 'fail blocked critical open high'.split(' ').indexOf(s) >= 0 ? C.r
    : 'partial testing progress medium investigating iterating dev build progressing'.split(' ').indexOf(s) >= 0 ? C.a
    : C.b
}

export function Dot({ s }: { s: string }) {
  return <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: dc(s), flexShrink: 0 }} />
}

export function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  const c = color || C.tx2
  return <span style={{ display: 'inline-flex', padding: '3px 8px', fontSize: 12, fontFamily: "'JetBrains Mono',monospace", borderRadius: 3, background: c + '0C', color: c, border: '1px solid ' + c + '15', whiteSpace: 'nowrap' }}>{children}</span>
}

export { dc }
