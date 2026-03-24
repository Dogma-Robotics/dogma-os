'use client'
import { useState } from 'react'
import { C } from '@/lib/theme'

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }
  return (
    <div style={{ position: 'relative', margin: '8px 0', borderRadius: 6, overflow: 'hidden', border: '1px solid ' + C.bd }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 12px', background: C.bg3, borderBottom: '1px solid ' + C.bd }}>
        <span style={{ fontSize: 11, color: C.tx3, fontFamily: "'JetBrains Mono',monospace" }}>{lang || 'code'}</span>
        <span onClick={copy} style={{ fontSize: 11, color: copied ? C.g : C.tx3, cursor: 'pointer', padding: '2px 8px', borderRadius: 3, background: copied ? C.g + '15' : 'transparent', border: '1px solid ' + (copied ? C.g + '30' : 'transparent'), userSelect: 'none' }}>{copied ? 'Copied' : 'Copy'}</span>
      </div>
      <pre style={{ margin: 0, padding: '12px 16px', background: C.bg, overflowX: 'auto', fontSize: 13, lineHeight: 1.6, fontFamily: "'JetBrains Mono',monospace", color: C.tx }}>{code}</pre>
    </div>
  )
}
