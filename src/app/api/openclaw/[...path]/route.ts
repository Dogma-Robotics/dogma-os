import { NextRequest, NextResponse } from 'next/server'

const GW = 'http://127.0.0.1:18789'

async function proxyRequest(req: NextRequest, params: { path: string[] }) {
  const path = '/' + (params.path || []).join('/')
  const url = GW + path + (req.nextUrl.search || '')

  try {
    const headers: Record<string, string> = { }
    // Forward relevant headers
    const ct = req.headers.get('content-type')
    if (ct) headers['content-type'] = ct
    const auth = req.headers.get('authorization')
    if (auth) headers['authorization'] = auth
    const accept = req.headers.get('accept')
    if (accept) headers['accept'] = accept

    const body = req.method !== 'GET' && req.method !== 'HEAD' ? await req.arrayBuffer() : undefined

    const resp = await fetch(url, {
      method: req.method,
      headers,
      body: body ? Buffer.from(body) : undefined,
    })

    const respHeaders = new Headers()
    // Copy response headers but strip frame-blocking ones
    resp.headers.forEach((value, key) => {
      const k = key.toLowerCase()
      if (k === 'x-frame-options') return
      if (k === 'content-security-policy') return
      if (k === 'content-encoding') return // let Next.js handle encoding
      respHeaders.set(key, value)
    })

    const contentType = resp.headers.get('content-type') || ''
    const respBody = await resp.arrayBuffer()

    // For HTML responses, rewrite asset URLs to go through the proxy
    if (contentType.includes('text/html')) {
      let html = new TextDecoder().decode(respBody)
      // Rewrite relative asset paths: ./assets/ → /api/openclaw/assets/
      html = html.replace(/(?:\.\/|"\/)assets\//g, '/api/openclaw/assets/')
      // Rewrite favicon paths
      html = html.replace(/(?:\.\/|"\/)favicon/g, '/api/openclaw/favicon')
      html = html.replace(/(?:\.\/|"\/)apple-touch/g, '/api/openclaw/apple-touch')
      // Fix WebSocket URL in the app to point to the real gateway
      html = html.replace(/<\/head>/, `<script>window.__OPENCLAW_GW_URL__="ws://127.0.0.1:18789";</script></head>`)
      respHeaders.set('content-type', 'text/html; charset=utf-8')
      return new NextResponse(html, { status: resp.status, headers: respHeaders })
    }

    return new NextResponse(respBody, { status: resp.status, headers: respHeaders })
  } catch (e: any) {
    return new NextResponse('OpenClaw gateway unreachable: ' + e.message, { status: 502 })
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(req, await params)
}
