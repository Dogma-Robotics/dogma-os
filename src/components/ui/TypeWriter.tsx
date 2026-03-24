'use client'
import { useState, useEffect, useRef } from 'react'
import { C } from '@/lib/theme'
import { MsgText } from './MsgText'

export function TypeWriter({ text, color }: { text: string; color: string }) {
  const [shown, setShown] = useState(0)
  const prev = useRef('')
  useEffect(() => {
    if (text.length > prev.current.length) {
      let i = prev.current.length
      prev.current = text
      function tick() { if (i < text.length) { i++; setShown(i); requestAnimationFrame(tick) } }
      tick()
    } else {
      setShown(text.length)
      prev.current = text
    }
  }, [text])
  const visible = text.slice(0, shown)
  return (
    <div style={{ padding: '6px 10px', borderRadius: 6, background: C.bg2, borderLeft: '2px solid ' + color, fontSize: 13, color: C.tx, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
      <MsgText text={visible} />
      <span style={{ display: 'inline-block', width: 6, height: 14, background: C.gold, marginLeft: 2, animation: 'blink 1s infinite' }} />
    </div>
  )
}
