// POST /api/entities — CRUD for all domain entities
// Actions: create, update, delete
import { NextRequest, NextResponse } from 'next/server'
import { resolveSession, hasPermission, logAudit, logActivity, getSupabase } from '@/lib/auth'

// Entity type → table name + permission mapping
const ENTITY_MAP: Record<string, { table: string; readPerm: string; writePerm: string }> = {
  ss:          { table: 'subsystems',       readPerm: 'read:subsystems', writePerm: 'write:subsystems' },
  subsystem:   { table: 'subsystems',       readPerm: 'read:subsystems', writePerm: 'write:subsystems' },
  skills:      { table: 'skills',           readPerm: 'read:projects',   writePerm: 'write:subsystems' },
  skill:       { table: 'skills',           readPerm: 'read:projects',   writePerm: 'write:subsystems' },
  tasks:       { table: 'tasks',            readPerm: 'read:tasks',      writePerm: 'write:tasks' },
  task:        { table: 'tasks',            readPerm: 'read:tasks',      writePerm: 'write:tasks' },
  pilots:      { table: 'pilots',           readPerm: 'read:pilots',     writePerm: 'write:pilots' },
  pilot:       { table: 'pilots',           readPerm: 'read:pilots',     writePerm: 'write:pilots' },
  investors:   { table: 'investors',        readPerm: 'read:investors',  writePerm: 'write:notes' },
  investor:    { table: 'investors',        readPerm: 'read:investors',  writePerm: 'write:notes' },
  incidents:   { table: 'incidents',        readPerm: 'read:incidents',  writePerm: 'write:incidents' },
  incident:    { table: 'incidents',        readPerm: 'read:incidents',  writePerm: 'write:incidents' },
  fleet:       { table: 'fleet',            readPerm: 'read:projects',   writePerm: 'write:subsystems' },
  exps:        { table: 'experiments',      readPerm: 'read:projects',   writePerm: 'write:subsystems' },
  experiment:  { table: 'experiments',      readPerm: 'read:projects',   writePerm: 'write:subsystems' },
  milestones:  { table: 'milestones',       readPerm: 'read:projects',   writePerm: 'write:tasks' },
  milestone:   { table: 'milestones',       readPerm: 'read:projects',   writePerm: 'write:tasks' },
  safety:      { table: 'safety_standards', readPerm: 'read:projects',   writePerm: 'write:subsystems' },
  supply:      { table: 'supply_items',     readPerm: 'read:projects',   writePerm: 'write:subsystems' },
}

// Field mappings: dashboard field names → DB column names
const FIELD_MAP: Record<string, Record<string, string>> = {
  subsystems: { mat: 'maturity_level', ver: 'version', d: 'details', risks: 'risks' },
  skills: { success: 'success_rate', tests: 'tests_count', gaps: 'gaps' },
  tasks: { pri: 'priority', ws: 'workspace', sb: 'sub_tasks', blocked: 'blocked_by', pct: 'progress' },
  pilots: { name: 'company_name', viab: 'viability_score', roi: 'roi_estimate', champ: 'champion_name', champStr: 'champion_strength', qs: 'open_questions', nextStep: 'next_step', comp: 'compliance_reqs', pain: 'pain_description', plc: 'plc_system', plant: 'plant_location', risk: 'risk_level' },
  investors: { name: 'fund_name', prob: 'probability', check: 'check_size', tp: 'touchpoints', next: 'next_action' },
  incidents: { sev: 'severity', desc: 'title', down: 'downtime', root: 'root_cause', acts: 'actions' },
  fleet: { unit: 'unit_name', type: 'unit_type', loc: 'location', sys: 'systems' },
  experiments: { conf: 'confidence', p: 'parameters' },
  milestones: { pct: 'progress', risk: 'risk_level', cr: 'criteria', target: 'target_date' },
  safety_standards: { cov: 'coverage', gaps: 'gaps' },
  supply_items: { item: 'item_name', lead: 'lead_time', risk: 'risk_level', note: 'notes' },
}

function mapFieldToDB(table: string, field: string): string {
  return FIELD_MAP[table]?.[field] || field
}

export async function POST(req: NextRequest) {
  try {
    const auth = await resolveSession()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
    const ctx = auth.ctx
    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'DB unavailable' }, { status: 500 })

    const { action, entityType, entityId, data: entityData } = await req.json()
    const mapping = ENTITY_MAP[entityType]
    if (!mapping) return NextResponse.json({ error: `Unknown entity type: ${entityType}` }, { status: 400 })

    // ── CREATE ──
    if (action === 'create') {
      if (!hasPermission(ctx, mapping.writePerm) && !hasPermission(ctx, 'write:*')) {
        return NextResponse.json({ error: `Permission denied: ${mapping.writePerm}` }, { status: 403 })
      }

      // Map dashboard field names to DB columns
      const dbData: any = { organization_id: ctx.organizationId }
      for (const [key, val] of Object.entries(entityData || {})) {
        const dbCol = mapFieldToDB(mapping.table, key)
        dbData[dbCol] = val
      }
      // Owner fields set only if columns exist in DB

      const { data: created, error } = await sb.from(mapping.table).insert(dbData).select().single()
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })

      await logActivity(ctx, 'create', entityType, created.id, { data: entityData })
      await logAudit(ctx, 'create', entityType, created.id, null, created)

      return NextResponse.json({ ok: true, action: 'created', entity: created })
    }

    // ── UPDATE ──
    if (action === 'update') {
      if (!hasPermission(ctx, mapping.writePerm) && !hasPermission(ctx, 'write:*')) {
        return NextResponse.json({ error: `Permission denied: ${mapping.writePerm}` }, { status: 403 })
      }
      if (!entityId) return NextResponse.json({ error: 'entityId required for update' }, { status: 400 })

      // Get before state
      const { data: before } = await sb.from(mapping.table).select('*').eq('id', entityId).eq('organization_id', ctx.organizationId).single()
      if (!before) return NextResponse.json({ error: 'Entity not found' }, { status: 404 })

      // Map fields
      const dbUpdates: any = { updated_at: new Date().toISOString() }
      for (const [key, val] of Object.entries(entityData || {})) {
        const dbCol = mapFieldToDB(mapping.table, key)
        dbUpdates[dbCol] = val
      }

      const { data: updated, error } = await sb.from(mapping.table)
        .update(dbUpdates)
        .eq('id', entityId).eq('organization_id', ctx.organizationId)
        .select().single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })

      await logActivity(ctx, 'update', entityType, entityId, { changes: entityData })
      await logAudit(ctx, 'update', entityType, entityId, before, updated)

      return NextResponse.json({ ok: true, action: 'updated', entity: updated })
    }

    // ── DELETE ──
    if (action === 'delete') {
      if (!hasPermission(ctx, mapping.writePerm) && !hasPermission(ctx, 'write:*')) {
        return NextResponse.json({ error: `Permission denied: ${mapping.writePerm}` }, { status: 403 })
      }
      if (!entityId) return NextResponse.json({ error: 'entityId required for delete' }, { status: 400 })

      const { data: before } = await sb.from(mapping.table).select('*').eq('id', entityId).eq('organization_id', ctx.organizationId).single()
      if (!before) return NextResponse.json({ error: 'Entity not found' }, { status: 404 })

      const { error } = await sb.from(mapping.table).delete().eq('id', entityId).eq('organization_id', ctx.organizationId)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })

      // Also delete associated notes
      try { await sb.from('notes').delete().eq('entity_id', entityId) } catch {}

      await logActivity(ctx, 'delete', entityType, entityId, { deleted: before })
      await logAudit(ctx, 'delete', entityType, entityId, before, null)

      return NextResponse.json({ ok: true, action: 'deleted', entityId })
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// GET /api/entities?type=tasks — list entities of a type
export async function GET(req: NextRequest) {
  try {
    const auth = await resolveSession()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
    const ctx = auth.ctx
    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'DB unavailable' }, { status: 500 })

    const type = new URL(req.url).searchParams.get('type') || ''
    const mapping = ENTITY_MAP[type]
    if (!mapping) return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 })

    if (!hasPermission(ctx, mapping.readPerm) && !hasPermission(ctx, 'read:*')) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 })
    }

    const { data, error } = await sb.from(mapping.table).select('*').eq('organization_id', ctx.organizationId).order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ entities: data || [] })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
