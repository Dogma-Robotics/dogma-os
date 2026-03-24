'use client'
import { C } from '@/lib/theme'
import { CodeBlock } from './CodeBlock'

export function MsgText({ text }: { text: string }) {
  if (!text) return null
  const parts = text.split(/(```[\s\S]*?```)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const lines = part.slice(3, -3).split('\n')
          const lang = lines[0].trim()
          const code = lang ? lines.slice(1).join('\n') : lines.join('\n')
          return <CodeBlock key={i} code={code} lang={lang || ''} />
        }
        const inlineParts = part.split(/(`[^`]+`)/g)
        return (
          <span key={i}>
            {inlineParts.map((ip, j) => {
              if (ip.startsWith('`') && ip.endsWith('`')) {
                return <code key={j} style={{ padding: '1px 6px', borderRadius: 3, background: C.bg3, color: C.gold, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", border: '1px solid ' + C.bd }}>{ip.slice(1, -1)}</code>
              }
              return ip
            })}
          </span>
        )
      })}
    </>
  )
}
