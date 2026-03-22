import { NextResponse } from 'next/server'
import { resolveSession } from '@/lib/auth'
export async function GET() {
  const auth = await resolveSession()
  if (auth.ok === false) return NextResponse.json({ error: auth.error }, { status: auth.status })
  return NextResponse.json({ gateway: { connected: false }, sessions: [] })
}
