import { NextRequest, NextResponse } from 'next/server'
import { SERVICES, storeToken } from '@/lib/services'

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  if (!code || !state) return NextResponse.redirect(`${BASE_URL}/settings?error=missing_params`)

  let parsed: { service: string }
  try { parsed = JSON.parse(Buffer.from(state, 'base64url').toString()) }
  catch { return NextResponse.redirect(`${BASE_URL}/settings?error=invalid_state`) }

  const svc = SERVICES[parsed.service]
  if (!svc) return NextResponse.redirect(`${BASE_URL}/settings?error=unknown_service`)

  console.log('=== OAUTH CALLBACK ===')
  console.log('Service:', parsed.service)
  console.log('Code:', code.slice(0, 20) + '...')
  console.log('Token URL:', svc.token_url)
  console.log('Client ID:', process.env[svc.client_id_env]?.slice(0, 10) + '...')
  console.log('Redirect URI:', `${BASE_URL}/api/connections/callback`)

  const resp = await fetch(svc.token_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({
      grant_type: 'authorization_code', code,
      redirect_uri: `${BASE_URL}/api/connections/callback`,
      client_id: process.env[svc.client_id_env]!,
      client_secret: process.env[svc.client_secret_env]!,
    }),
  })

  const body = await resp.text()
  console.log('Token response status:', resp.status)
  console.log('Token response body:', body)

  if (!resp.ok) return NextResponse.redirect(`${BASE_URL}/settings?error=token_failed&service=${parsed.service}`)

  const tokens = JSON.parse(body)
  await storeToken('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', parsed.service, { access_token: tokens.access_token, refresh_token: tokens.refresh_token } as any)
  return NextResponse.redirect(`${BASE_URL}/settings?connected=${parsed.service}`)
}
