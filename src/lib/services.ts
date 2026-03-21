// ══════════════════════════════════════════════════════════════════
// DOGMA OS — Services Layer (org-scoped, no hardcode)
// ══════════════════════════════════════════════════════════════════

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { getSupabase } from './auth'

// ── MCP Service Definitions ──

export interface ServiceDef {
  name: string
  icon: string
  mcp_url?: string
  client_id_env: string
  client_secret_env: string
  auth_url: string
  token_url: string
  scopes: string
}

export const SERVICES: Record<string, ServiceDef> = {
  google: {
    name: 'Google', icon: '🔵',
    mcp_url: 'https://mcp.google.com/sse',
    client_id_env: 'GOOGLE_CLIENT_ID', client_secret_env: 'GOOGLE_CLIENT_SECRET',
    auth_url: 'https://accounts.google.com/o/oauth2/v2/auth',
    token_url: 'https://oauth2.googleapis.com/token',
    scopes: 'openid email profile https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/gmail.readonly',
  },
  github: {
    name: 'GitHub', icon: '⚫',
    mcp_url: 'https://mcp.github.com/sse',
    client_id_env: 'GITHUB_CLIENT_ID', client_secret_env: 'GITHUB_CLIENT_SECRET',
    auth_url: 'https://github.com/login/oauth/authorize',
    token_url: 'https://github.com/login/oauth/access_token',
    scopes: 'read:user user:email repo',
  },
  slack: {
    name: 'Slack', icon: '💬',
    mcp_url: 'https://mcp.slack.com/sse',
    client_id_env: 'SLACK_CLIENT_ID', client_secret_env: 'SLACK_CLIENT_SECRET',
    auth_url: 'https://slack.com/oauth/v2/authorize',
    token_url: 'https://slack.com/api/oauth.v2.access',
    scopes: 'channels:read chat:write users:read',
  },
  figma: {
    name: 'Figma', icon: '🎨',
    mcp_url: 'https://mcp.figma.com/sse',
    client_id_env: 'FIGMA_CLIENT_ID', client_secret_env: 'FIGMA_CLIENT_SECRET',
    auth_url: 'https://www.figma.com/oauth',
    token_url: 'https://api.figma.com/v1/oauth/token',
    scopes: 'files:read',
  },
  canva: {
    name: 'Canva', icon: '🖼️',
    mcp_url: 'https://mcp.canva.com/sse',
    client_id_env: 'CANVA_CLIENT_ID', client_secret_env: 'CANVA_CLIENT_SECRET',
    auth_url: 'https://www.canva.com/api/oauth/authorize',
    token_url: 'https://api.canva.com/rest/v1/oauth/token',
    scopes: 'design:content:read',
  },
  miro: {
    name: 'Miro', icon: '📋',
    mcp_url: 'https://mcp.miro.com/sse',
    client_id_env: 'MIRO_CLIENT_ID', client_secret_env: 'MIRO_CLIENT_SECRET',
    auth_url: 'https://miro.com/oauth/authorize',
    token_url: 'https://api.miro.com/v1/oauth/token',
    scopes: 'boards:read boards:write',
  },
  microsoft: {
    name: 'Microsoft', icon: '🟦',
    mcp_url: undefined,
    client_id_env: 'MICROSOFT_CLIENT_ID', client_secret_env: 'MICROSOFT_CLIENT_SECRET',
    auth_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    token_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scopes: 'openid email profile User.Read Files.Read.All',
  },
  linear: {
    name: 'Linear', icon: '📐',
    mcp_url: 'https://mcp.linear.app/sse',
    client_id_env: 'LINEAR_CLIENT_ID', client_secret_env: 'LINEAR_CLIENT_SECRET',
    auth_url: 'https://linear.app/oauth/authorize',
    token_url: 'https://api.linear.app/oauth/token',
    scopes: 'read write',
  },
  notion: {
    name: 'Notion', icon: '📝',
    mcp_url: 'https://mcp.notion.so/sse',
    client_id_env: 'NOTION_CLIENT_ID', client_secret_env: 'NOTION_CLIENT_SECRET',
    auth_url: 'https://api.notion.com/v1/oauth/authorize',
    token_url: 'https://api.notion.com/v1/oauth/token',
    scopes: '',
  },
}

// ── Org-scoped connection queries ──

export async function getConnections(orgId: string, userId: string): Promise<{ service: string; user_id: string; email?: string; connectedAt?: string }[]> {
  const sb = getSupabase()
  if (!sb) return []
  try {
    const { data, error } = await sb
      .from('service_connections')
      .select('service, user_id, external_account_email, connected_at')
      .eq('organization_id', orgId)
      .eq('user_id', userId)
      .eq('status', 'active')
    if (error || !data) return []
    return data.map((d: any) => ({
      service: d.service,
      user_id: d.user_id,
      email: d.external_account_email,
      connectedAt: d.connected_at,
    }))
  } catch { return [] }
}

export async function getToken(orgId: string, userId: string, service: string): Promise<string | null> {
  const sb = getSupabase()
  if (!sb) return null
  try {
    const { data, error } = await sb
      .from('oauth_tokens')
      .select('access_token_encrypted, expires_at')
      .eq('organization_id', orgId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (error || !data) return null
    // TODO: decrypt token when encryption is added
    // For now, access_token_encrypted stores plaintext (migration path)
    return data.access_token_encrypted
  } catch { return null }
}

export async function storeToken(
  orgId: string, userId: string, service: string,
  tokenOrAccess: string | { access_token: string; refresh_token?: string },
  refreshToken?: string
): Promise<void> {
  const sb = getSupabase()
  if (!sb) return
  try {
    const accessToken = typeof tokenOrAccess === 'string' ? tokenOrAccess : tokenOrAccess.access_token
    const refresh = typeof tokenOrAccess === 'string' ? (refreshToken || null) : (tokenOrAccess.refresh_token || null)

    // Upsert service connection
    const { data: conn } = await sb.from('service_connections').upsert({
      organization_id: orgId,
      user_id: userId,
      service,
      status: 'active',
      connected_at: new Date().toISOString(),
    }, { onConflict: 'organization_id,user_id,service' }).select('id').single()

    // Store token
    if (conn) {
      await sb.from('oauth_tokens').upsert({
        organization_id: orgId,
        user_id: userId,
        service_connection_id: conn.id,
        access_token_encrypted: accessToken, // TODO: encrypt
        refresh_token_encrypted: refresh,
        updated_at: new Date().toISOString(),
      })
    }
  } catch (e) {
    console.log('storeToken error:', e)
  }
}

// ── Backward-compatible helpers (for connections route during migration) ──
// These use the old table names if the new ones don't exist yet

export async function getConnectionsLegacy(): Promise<{ service: string; user_id: string; email?: string; connectedAt?: string }[]> {
  const sb = getSupabase()
  if (!sb) return []
  try {
    // Try new table first
    const { data, error } = await sb.from('service_connections').select('service, user_id, external_account_email, connected_at').eq('status', 'active')
    if (!error && data) return data.map((d: any) => ({ service: d.service, user_id: d.user_id, email: d.external_account_email, connectedAt: d.connected_at }))
    // Fallback to old table
    const { data: old } = await sb.from('connections').select('service, user_id, email, connected_at').eq('user_id', '00000000-0000-0000-0000-000000000002')
    if (old) return old.map((d: any) => ({ service: d.service, user_id: d.user_id, email: d.email, connectedAt: d.connected_at }))
    return []
  } catch { return [] }
}

export async function getTokenLegacy(service: string): Promise<string | null> {
  const sb = getSupabase()
  if (!sb) return null
  try {
    const { data } = await sb.from('oauth_tokens').select('access_token_encrypted').eq('service_connection_id', service).limit(1).single()
    if (data) return data.access_token_encrypted
    // Fallback: old table
    const { data: old } = await sb.from('oauth_tokens').select('access_token').eq('service', service).limit(1).single()
    if (old) return (old as any).access_token
    return null
  } catch { return null }
}

// ── File Storage (private, org-scoped) ──

const STORAGE_ROOT = join(process.cwd(), '.dogma-storage')

export function storeFile(
  orgId: string,
  visibility: 'public' | 'internal' | 'restricted',
  filename: string,
  content: string | Buffer,
  mimeType: string
): { path: string; url: string } {
  const dir = join(STORAGE_ROOT, orgId, visibility)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  const ts = Date.now()
  const finalName = `${ts}_${safeName}`
  const filepath = join(dir, finalName)

  if (typeof content === 'string') {
    writeFileSync(filepath, content, 'utf-8')
  } else {
    writeFileSync(filepath, content)
  }

  // For public files, also write to public/generated for backward compat
  if (visibility === 'public') {
    const pubDir = join(process.cwd(), 'public', 'generated')
    if (!existsSync(pubDir)) mkdirSync(pubDir, { recursive: true })
    if (typeof content === 'string') {
      writeFileSync(join(pubDir, finalName), content, 'utf-8')
    } else {
      writeFileSync(join(pubDir, finalName), content)
    }
  }

  // Log to DB
  const sb = getSupabase()
  if (sb) {
    sb.from('artifacts').insert({
      organization_id: orgId,
      title: safeName,
      file_path: filepath,
      storage_visibility: visibility,
      mime_type: mimeType,
      size_bytes: typeof content === 'string' ? content.length : content.length,
    }).then(() => {}, () => {})
  }

  // Return URL — public files served from /generated/, others via API
  if (visibility === 'public') {
    return { path: filepath, url: `/generated/${finalName}` }
  }
  return { path: filepath, url: `/api/artifacts/${finalName}?org=${orgId}&v=${visibility}` }
}

// Backward compat
export function storeFileLocally(filename: string, content: string | Buffer, mimeType: string): string {
  const { url } = storeFile(
    '00000000-0000-0000-0000-000000000001',
    'public',
    filename,
    content,
    mimeType
  )
  return url
}

// Legacy Supabase export for backward compat
export const supabase = getSupabase()
export function hasSupabase(): boolean {
  return !!getSupabase()
}
