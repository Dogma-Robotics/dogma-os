// GET /api/data — Backward compatibility layer
// Proxies to /api/dashboard/summary and reshapes response to old format
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    // Proxy to new dashboard summary
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/dashboard/summary`, {
      headers: { cookie: req.headers.get('cookie') || '' },
    })
    const data = await res.json()

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: res.status })
    }

    // Return in old format for backward compat
    return NextResponse.json({
      data: data,
      updated_at: new Date().toISOString(),
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
