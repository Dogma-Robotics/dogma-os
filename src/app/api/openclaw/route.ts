import { NextRequest, NextResponse } from 'next/server'

const GW = 'http://127.0.0.1:18789'

export async function GET(req: NextRequest) {
  try {
    const resp = await fetch(GW + '/' + (req.nextUrl.search || ''))
    const html = await resp.text()
    const fixed = html
      .replace(/(?:\.\/|"\/)assets\//g, '/api/openclaw/assets/')
      .replace(/(?:\.\/|"\/)favicon/g, '/api/openclaw/favicon')
      .replace(/(?:\.\/|"\/)apple-touch/g, '/api/openclaw/apple-touch')
      .replace(/<\/head>/, `<script>window.__OPENCLAW_GW_URL__="ws://127.0.0.1:18789";</script></head>`)
    return new NextResponse(fixed, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  } catch (e: any) {
    return new NextResponse('OpenClaw gateway unreachable', { status: 502 })
  }
}
