import { NextRequest, NextResponse } from 'next/server'

const GW = 'http://127.0.0.1:18789'
const TOKEN = 'c1b587d6e4015fcba76853c05e4004d8a2c3576c4eff3d0b'

export async function GET(req: NextRequest) {
  try {
    const resp = await fetch(GW + '/' + (req.nextUrl.search || ''))
    let html = await resp.text()

    // Rewrite asset paths to go through proxy
    html = html.replace(/(?:\.\/|"\/)assets\//g, '/api/openclaw/assets/')
    html = html.replace(/(?:\.\/|"\/)favicon/g, '/api/openclaw/favicon')
    html = html.replace(/(?:\.\/|"\/)apple-touch/g, '/api/openclaw/apple-touch')

    // Inject script to configure the gateway URL and auto-connect
    const inject = `<script>
      // Override WebSocket to connect directly to gateway (bypasses proxy for WS)
      window.__OPENCLAW_GW__ = "ws://127.0.0.1:18789";
      window.__OPENCLAW_TOKEN__ = "${TOKEN}";
      // Store connection info for the app to pick up
      try {
        localStorage.setItem('openclaw:gateway-url', 'ws://127.0.0.1:18789');
        localStorage.setItem('openclaw:token', '${TOKEN}');
      } catch(e) {}
    </script>`
    html = html.replace('</head>', inject + '</head>')

    return new NextResponse(html, {
      status: 200,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  } catch (e: any) {
    return new NextResponse('OpenClaw gateway unreachable', { status: 502 })
  }
}
