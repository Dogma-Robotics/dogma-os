// ══════════════════════════════════════════════════════════════════
// DOGMA OS — Auth & Permission Layer
// Replaces all hardcoded 'jero' lookups with real auth context
// ══════════════════════════════════════════════════════════════════

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export function getSupabase() {
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey)
}

// ── Types ──

export interface SessionContext {
  userId: string
  email: string
  name: string
  organizationId: string
  organizationSlug: string
  role: string
  permissions: string[]
}

export type AuthResult = 
  | { ok: true; ctx: SessionContext }
  | { ok: false; error: string; status: number }

// ── Role → Permission matrix (mirrored from DB for fast checks) ──

const ROLE_PERMISSIONS: Record<string, string[]> = {
  founder_admin: ['read:*', 'write:*', 'manage:*', 'agent:*'],
  ops_admin: [
    'read:projects', 'read:tasks', 'read:pilots', 'read:incidents', 'read:subsystems', 'read:artifacts', 'read:connections',
    'write:tasks', 'write:pilots', 'write:incidents', 'write:notes',
    'agent:chat.basic', 'agent:chat.mutate', 'agent:swarm.basic',
  ],
  engineer: [
    'read:projects', 'read:tasks', 'read:subsystems', 'read:incidents', 'read:artifacts',
    'write:tasks', 'write:subsystems', 'write:notes',
    'agent:chat.basic',
  ],
  finance: [
    'read:projects', 'read:investors', 'read:pilots', 'read:artifacts',
    'write:notes',
    'agent:chat.basic',
  ],
  advisor_readonly: ['read:projects', 'read:tasks', 'read:pilots'],
  contractor_limited: ['read:tasks', 'write:tasks'],
}

// ── Session Resolution ──

export async function resolveSession(): Promise<AuthResult> {
  const sb = getSupabase()
  if (!sb) {
    // Fallback: no Supabase → use default founder context (dev mode)
    return {
      ok: true,
      ctx: {
        userId: '00000000-0000-0000-0000-000000000002',
        email: 'jero@dogmarobotics.com',
        name: 'Jeronimo Ortiz',
        organizationId: '00000000-0000-0000-0000-000000000001',
        organizationSlug: 'dogma',
        role: 'founder_admin',
        permissions: ROLE_PERMISSIONS['founder_admin'],
      }
    }
  }

  // Try to get session from cookie
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('dogma_session')?.value

  if (!sessionToken) {
    // ⚠️ WARNING: Falling back to founder_admin — NO REAL AUTH SESSION
    // Remove this fallback once NextAuth/session cookies are implemented
    console.warn('[AUTH] No session found — using founder_admin fallback. This is insecure in production.')
    return {
      ok: true,
      ctx: {
        userId: '00000000-0000-0000-0000-000000000002',
        email: 'jero@dogmarobotics.com',
        name: 'Jeronimo Ortiz',
        organizationId: '00000000-0000-0000-0000-000000000001',
        organizationSlug: 'dogma',
        role: 'founder_admin',
        permissions: ROLE_PERMISSIONS['founder_admin'],
      }
    }
  }

  // Resolve session from DB
  try {
    // Look up user by session token
    const { data: user, error } = await sb
      .from('users')
      .select('id, email, name')
      .eq('id', sessionToken)
      .single()

    if (error || !user) {
      return { ok: false, error: 'Invalid session', status: 401 }
    }

    // Get active membership
    const { data: membership } = await sb
      .from('organization_memberships')
      .select('organization_id, role')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (!membership) {
      return { ok: false, error: 'No active organization', status: 403 }
    }

    // Get org
    const { data: org } = await sb
      .from('organizations')
      .select('id, slug')
      .eq('id', membership.organization_id)
      .single()

    const role = membership.role || 'engineer'
    const permissions = ROLE_PERMISSIONS[role] || []

    return {
      ok: true,
      ctx: {
        userId: user.id,
        email: user.email,
        name: user.name,
        organizationId: membership.organization_id,
        organizationSlug: org?.slug || 'unknown',
        role,
        permissions,
      }
    }
  } catch (e: any) {
    return { ok: false, error: 'Auth error: ' + e.message, status: 500 }
  }
}

// ── Permission Checks ──

export function hasPermission(ctx: SessionContext, permission: string): boolean {
  // Wildcard check
  const [action, resource] = permission.split(':')
  if (ctx.permissions.includes(`${action}:*`)) return true
  if (ctx.permissions.includes(permission)) return true
  return false
}

export function requirePermission(ctx: SessionContext, permission: string): void {
  if (!hasPermission(ctx, permission)) {
    throw new Error(`Permission denied: ${permission} (role: ${ctx.role})`)
  }
}

// ── Agent Policy ──

export type AgentTier = 'readonly' | 'controlled' | 'sensitive'

const AGENT_TIERS: Record<string, AgentTier> = {
  planner: 'readonly',
  researcher: 'readonly',
  reviewer: 'readonly',
  documenter: 'readonly',
  tester: 'readonly',
  'perf-benchmarker': 'readonly',
  'e2e-runner': 'readonly',
  
  'backend-dev': 'controlled',
  'frontend-dev': 'controlled',
  coder: 'controlled',
  'data-engineer': 'controlled',
  'mobile-dev': 'controlled',
  coordinator: 'controlled',
  'build-resolver': 'controlled',
  'refactor-cleaner': 'controlled',
  optimizer: 'controlled',
  architect: 'controlled',

  'security-scanner': 'sensitive',
  'cicd-engineer': 'sensitive',
}

export function getAgentTier(agentId: string): AgentTier {
  return AGENT_TIERS[agentId] || 'readonly'
}

export function canUseAgent(ctx: SessionContext, agentId: string): boolean {
  const tier = getAgentTier(agentId)
  if (tier === 'readonly') return hasPermission(ctx, 'agent:chat.basic')
  if (tier === 'controlled') return hasPermission(ctx, 'agent:chat.mutate')
  if (tier === 'sensitive') return hasPermission(ctx, 'agent:*') || ctx.role === 'founder_admin'
  return false
}

export function getAgentToolAllowlist(agentId: string, tier: AgentTier): string[] {
  const base = ['generate_html_report', 'generate_csv', 'generate_json', 'generate_markdown', 'generate_latex', 'web_search']
  if (tier === 'readonly') return base
  if (tier === 'controlled') return [...base, 'create_task', 'update_task_status', 'append_note', 'advance_pilot_stage']
  if (tier === 'sensitive') return [...base, 'create_task', 'update_task_status', 'append_note', 'advance_pilot_stage', 'update_incident_status', 'manage_connections']
  return base
}

// ── Audit helper ──

export async function logAudit(ctx: SessionContext, action: string, resourceType: string, resourceId: string, before?: any, after?: any, decision?: string) {
  const sb = getSupabase()
  if (!sb) return
  try {
    await sb.from('audit_events').insert({
      organization_id: ctx.organizationId,
      actor_user_id: ctx.userId,
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      before_json: before || null,
      after_json: after || null,
      policy_decision: decision || 'allowed',
    })
  } catch {}
}

export async function logActivity(ctx: SessionContext, action: string, entityType?: string, entityId?: string, details?: any) {
  const sb = getSupabase()
  if (!sb) return
  try {
    await sb.from('activity_log').insert({
      organization_id: ctx.organizationId,
      actor_user_id: ctx.userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details: details || {},
    })
  } catch {}
}
