// ══════════════════════════════════════════════════════════════════
// DOGMA OS — Domain Commands
// Replaces the generic edit_node with explicit, validated mutations
// Each command: validates schema → checks permissions → applies change → audits
// ══════════════════════════════════════════════════════════════════

import { getSupabase } from './auth'
import type { SessionContext } from './auth'
import { logAudit, logActivity, requirePermission } from './auth'

interface CommandResult {
  ok: boolean
  message: string
  entity?: any
  mutation?: { type: string; entity_type: string; entity_id: string; field?: string; value?: any }
}

// ── CREATE TASK ──

export async function createTask(ctx: SessionContext, input: {
  title: string; description?: string; priority?: string; workspace?: string; due_at?: string; project_id?: string
}): Promise<CommandResult> {
  requirePermission(ctx, 'write:tasks')
  const sb = getSupabase()
  if (!sb) return { ok: false, message: 'DB not available' }

  const { data, error } = await sb.from('tasks').insert({
    organization_id: ctx.organizationId,
    title: input.title,
    description: input.description || '',
    priority: input.priority || 'medium',
    workspace: input.workspace || 'General',
    status: 'todo',
    assignee_user_id: ctx.userId,
    created_by: ctx.userId,
    due_at: input.due_at || null,
    project_id: input.project_id || null,
  }).select().single()

  if (error) return { ok: false, message: error.message }

  await logActivity(ctx, 'create_task', 'task', data.id, { title: input.title })
  await logAudit(ctx, 'create', 'task', data.id, null, data)

  return {
    ok: true,
    message: `✅ Task created: ${input.title}`,
    entity: data,
    mutation: { type: 'create', entity_type: 'task', entity_id: data.id },
  }
}

// ── UPDATE TASK STATUS ──

export async function updateTaskStatus(ctx: SessionContext, input: {
  task_id: string; status: string
}): Promise<CommandResult> {
  requirePermission(ctx, 'write:tasks')
  const sb = getSupabase()
  if (!sb) return { ok: false, message: 'DB not available' }

  const validStatuses = ['todo', 'progress', 'blocked', 'done']
  if (!validStatuses.includes(input.status)) {
    return { ok: false, message: `Invalid status. Must be: ${validStatuses.join(', ')}` }
  }

  const { data: before } = await sb.from('tasks').select('*').eq('id', input.task_id).eq('organization_id', ctx.organizationId).single()
  if (!before) return { ok: false, message: 'Task not found' }

  const { data, error } = await sb.from('tasks')
    .update({ status: input.status, updated_at: new Date().toISOString() })
    .eq('id', input.task_id).eq('organization_id', ctx.organizationId)
    .select().single()

  if (error) return { ok: false, message: error.message }

  await logAudit(ctx, 'update_status', 'task', input.task_id, { status: before.status }, { status: input.status })
  await logActivity(ctx, 'update_task_status', 'task', input.task_id, { from: before.status, to: input.status })

  return {
    ok: true,
    message: `✅ Task ${before.title}: ${before.status} → ${input.status}`,
    entity: data,
    mutation: { type: 'update', entity_type: 'task', entity_id: input.task_id, field: 'status', value: input.status },
  }
}

// ── APPEND NOTE ──

export async function appendNote(ctx: SessionContext, input: {
  entity_type: string; entity_id: string; body: string
}): Promise<CommandResult> {
  requirePermission(ctx, 'write:notes')
  const sb = getSupabase()
  if (!sb) return { ok: false, message: 'DB not available' }

  const validTypes = ['subsystem', 'task', 'pilot', 'investor', 'incident', 'experiment', 'fleet', 'milestone']
  if (!validTypes.includes(input.entity_type)) {
    return { ok: false, message: `Invalid entity type. Must be: ${validTypes.join(', ')}` }
  }

  const { data, error } = await sb.from('notes').insert({
    organization_id: ctx.organizationId,
    entity_type: input.entity_type,
    entity_id: input.entity_id,
    author_user_id: ctx.userId,
    body: input.body,
  }).select().single()

  if (error) return { ok: false, message: error.message }

  await logActivity(ctx, 'append_note', input.entity_type, input.entity_id, { body: input.body.slice(0, 100) })

  return {
    ok: true,
    message: `✅ Note added to ${input.entity_type}/${input.entity_id}`,
    entity: data,
    mutation: { type: 'append_note', entity_type: input.entity_type, entity_id: input.entity_id },
  }
}

// ── ADVANCE PILOT STAGE ──

export async function advancePilotStage(ctx: SessionContext, input: {
  pilot_id: string
}): Promise<CommandResult> {
  requirePermission(ctx, 'write:pilots')
  const sb = getSupabase()
  if (!sb) return { ok: false, message: 'DB not available' }

  const stages = ['Identified', 'Auto Score', 'Manual Score', 'Line Analysis', 'Site Visit', 'Proposal Sent', 'Negotiation', 'Signed']

  const { data: pilot } = await sb.from('pilots').select('*').eq('id', input.pilot_id).eq('organization_id', ctx.organizationId).single()
  if (!pilot) return { ok: false, message: 'Pilot not found' }

  const curIdx = stages.indexOf(pilot.stage)
  if (curIdx < 0 || curIdx >= stages.length - 1) {
    return { ok: false, message: `Cannot advance: current stage "${pilot.stage}" is final or unknown` }
  }

  const nextStage = stages[curIdx + 1]
  const { error } = await sb.from('pilots')
    .update({ stage: nextStage, updated_at: new Date().toISOString() })
    .eq('id', input.pilot_id).eq('organization_id', ctx.organizationId)

  if (error) return { ok: false, message: error.message }

  await logAudit(ctx, 'advance_stage', 'pilot', input.pilot_id, { stage: pilot.stage }, { stage: nextStage })
  await logActivity(ctx, 'advance_pilot', 'pilot', input.pilot_id, { from: pilot.stage, to: nextStage, company: pilot.company_name })

  return {
    ok: true,
    message: `✅ ${pilot.company_name}: ${pilot.stage} → ${nextStage}`,
    mutation: { type: 'advance_stage', entity_type: 'pilot', entity_id: input.pilot_id, field: 'stage', value: nextStage },
  }
}

// ── UPDATE INCIDENT STATUS ──

export async function updateIncidentStatus(ctx: SessionContext, input: {
  incident_id: string; status: string
}): Promise<CommandResult> {
  requirePermission(ctx, 'write:incidents')
  const sb = getSupabase()
  if (!sb) return { ok: false, message: 'DB not available' }

  const validStatuses = ['open', 'investigating', 'resolved']
  if (!validStatuses.includes(input.status)) {
    return { ok: false, message: `Invalid status. Must be: ${validStatuses.join(', ')}` }
  }

  const { data: before } = await sb.from('incidents').select('*').eq('id', input.incident_id).eq('organization_id', ctx.organizationId).single()
  if (!before) return { ok: false, message: 'Incident not found' }

  const updates: any = { status: input.status, updated_at: new Date().toISOString() }
  if (input.status === 'resolved') updates.resolved_at = new Date().toISOString()

  const { error } = await sb.from('incidents')
    .update(updates)
    .eq('id', input.incident_id).eq('organization_id', ctx.organizationId)

  if (error) return { ok: false, message: error.message }

  await logAudit(ctx, 'update_status', 'incident', input.incident_id, { status: before.status }, { status: input.status })
  await logActivity(ctx, 'update_incident', 'incident', input.incident_id, { from: before.status, to: input.status })

  return {
    ok: true,
    message: `✅ Incident ${before.title}: ${before.status} → ${input.status}`,
    mutation: { type: 'update', entity_type: 'incident', entity_id: input.incident_id, field: 'status', value: input.status },
  }
}

// ── UPDATE SUBSYSTEM ──

export async function updateSubsystem(ctx: SessionContext, input: {
  subsystem_id: string; field: string; value: any
}): Promise<CommandResult> {
  requirePermission(ctx, 'write:subsystems')
  const sb = getSupabase()
  if (!sb) return { ok: false, message: 'DB not available' }

  const allowedFields = ['maturity_level', 'status', 'version', 'name', 'category']
  if (!allowedFields.includes(input.field)) {
    return { ok: false, message: `Cannot update field "${input.field}". Allowed: ${allowedFields.join(', ')}` }
  }

  const { data: before } = await sb.from('subsystems').select('*').eq('id', input.subsystem_id).eq('organization_id', ctx.organizationId).single()
  if (!before) return { ok: false, message: 'Subsystem not found' }

  const { error } = await sb.from('subsystems')
    .update({ [input.field]: input.value, updated_at: new Date().toISOString() })
    .eq('id', input.subsystem_id).eq('organization_id', ctx.organizationId)

  if (error) return { ok: false, message: error.message }

  await logAudit(ctx, 'update_field', 'subsystem', input.subsystem_id, { [input.field]: (before as any)[input.field] }, { [input.field]: input.value })

  return {
    ok: true,
    message: `✅ ${before.name}.${input.field} updated to ${input.value}`,
    mutation: { type: 'update', entity_type: 'subsystem', entity_id: input.subsystem_id, field: input.field, value: input.value },
  }
}

// ── TOOL EXECUTOR (maps tool names to commands) ──

export async function executeCommand(ctx: SessionContext, toolName: string, input: any): Promise<CommandResult> {
  switch (toolName) {
    case 'create_task': return createTask(ctx, input)
    case 'update_task_status': return updateTaskStatus(ctx, input)
    case 'append_note': return appendNote(ctx, input)
    case 'advance_pilot_stage': return advancePilotStage(ctx, input)
    case 'update_incident_status': return updateIncidentStatus(ctx, input)
    case 'update_subsystem': return updateSubsystem(ctx, input)
    default: return { ok: false, message: `Unknown command: ${toolName}` }
  }
}
