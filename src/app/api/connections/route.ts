import { NextRequest, NextResponse } from 'next/server'
import { SERVICES, storeToken, getConnections } from '@/lib/services'
import { getSupabase } from '@/lib/auth'

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function GET() {
  const connections = await getConnections('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002')
  const all = Object.entries(SERVICES).map(([key, svc]) => {
    const conn = connections.find(c => c.service === key)
    return {
      id: key, name: svc.name, icon: svc.icon,
      connected: !!conn, email: conn?.email || null,
      connectedAt: conn?.connectedAt || null,
      hasCredentials: !!(process.env[svc.client_id_env] && process.env[svc.client_secret_env]),
    }
  })
  return NextResponse.json(all)
}

export async function POST(req: NextRequest) {
  const { service, action, token } = await req.json()

  if (action === 'disconnect') {
    await getSupabase()?.from('connections').delete().eq('user_id','jero').eq('service', service)
    return NextResponse.json({ ok: true })
  }

  if (action === 'manual_token') {
    await storeToken('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', service, { access_token: token } as any)
    return NextResponse.json({ ok: true })
  }

  const svc = SERVICES[service]
  if (!svc) return NextResponse.json({ error: 'Unknown service' }, { status: 400 })

  const clientId = process.env[svc.client_id_env]
  if (!clientId) return NextResponse.json({ error: `Set ${svc.client_id_env} in env` }, { status: 400 })

  const state = Buffer.from(JSON.stringify({ service })).toString('base64url')
  const params = new URLSearchParams({
    client_id: clientId, redirect_uri: `${BASE_URL}/api/connections/callback`,
    response_type: 'code', scope: svc.scopes, state,
  })
  if (service === 'google') { params.set('access_type','offline'); params.set('prompt','consent') }

  return NextResponse.json({ oauth_url: `${svc.auth_url}?${params}` })
}
