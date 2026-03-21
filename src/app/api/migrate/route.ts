// POST /api/migrate — One-time migration from dogma_data blob → normalized tables
// Run once after applying SQL schema, then delete this file

import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/auth'

const ORG_ID = '00000000-0000-0000-0000-000000000001'
const USER_ID = '00000000-0000-0000-0000-000000000002'

export async function POST() {
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'No Supabase' }, { status: 500 })

  try {
    // Read old blob
    const { data: row } = await sb.from('dogma_data').select('data').eq('user_id', 'jero').single()
    if (!row) return NextResponse.json({ error: 'No dogma_data found for jero' }, { status: 404 })
    const D = row.data
    const results: any = {}

    // Migrate subsystems
    if (D.ss) {
      const rows = D.ss.map((s: any) => ({
        organization_id: ORG_ID, name: s.name, category: 'mechanical',
        maturity_level: s.mat || 0, status: s.status || 'dev', version: s.ver,
        owner_user_id: USER_ID, details: s.d || [], risks: s.risks || [],
        metadata: { legacy_id: s.id, issues: s.issues, lastTest: s.lastTest },
      }))
      const { error } = await sb.from('subsystems').insert(rows)
      results.subsystems = error ? error.message : `${rows.length} migrated`
    }

    // Migrate skills
    if (D.skills) {
      const rows = D.skills.map((s: any) => ({
        organization_id: ORG_ID, name: s.name, success_rate: s.success || 0,
        status: s.status || 'dev', tests_count: s.tests || 0, protocol: s.protocol || '',
        gaps: s.gaps || [], metadata: { legacy_id: s.id, lastTest: s.lastTest },
      }))
      const { error } = await sb.from('skills').insert(rows)
      results.skills = error ? error.message : `${rows.length} migrated`
    }

    // Migrate tasks
    if (D.tasks) {
      const rows = D.tasks.map((t: any) => ({
        organization_id: ORG_ID, title: t.title,
        status: t.status || 'todo', priority: t.pri || 'medium',
        workspace: t.ws || 'General', assignee_user_id: USER_ID, created_by: USER_ID,
        due_at: t.due ? new Date(`${t.due} 2026`).toISOString() : null,
        blocked_by: t.blocked || null, sub_tasks: t.sb || [], impact: t.impact || '',
        metadata: { legacy_id: t.id },
      }))
      const { error } = await sb.from('tasks').insert(rows)
      results.tasks = error ? error.message : `${rows.length} migrated`
    }

    // Migrate pilots
    if (D.pilots) {
      const rows = D.pilots.map((p: any) => ({
        organization_id: ORG_ID, company_name: p.name,
        stage: p.stage || 'Identified', viability_score: p.viab || 0,
        roi_estimate: p.roi || '', champion_name: p.champ || '',
        champion_strength: p.champStr || 'None', plant_location: p.plant || '',
        plc_system: p.plc || '', pain_description: p.pain || '',
        required_skills: p.skills || [], compliance_reqs: p.comp || [],
        risk_level: p.risk || 'medium', open_questions: p.qs || [],
        next_step: p.nextStep || '', blockers: p.blockers || [],
        meetings: p.meetings || [], owner_user_id: USER_ID,
        metadata: { legacy_id: p.id, fu: p.fu },
      }))
      const { error } = await sb.from('pilots').insert(rows)
      results.pilots = error ? error.message : `${rows.length} migrated`
    }

    // Migrate investors
    if (D.investors) {
      const rows = D.investors.map((v: any) => ({
        organization_id: ORG_ID, fund_name: v.name,
        stage: v.stage || 'Researched', probability: v.prob || 0,
        check_size: v.check || '', thesis: v.thesis || '',
        objections: v.objections || [], touchpoints: v.tp || [],
        next_action: v.next || '', owner_user_id: USER_ID,
        metadata: { legacy_id: v.id, nextDate: v.nextDate },
      }))
      const { error } = await sb.from('investors').insert(rows)
      results.investors = error ? error.message : `${rows.length} migrated`
    }

    // Migrate incidents
    if (D.incidents) {
      const rows = D.incidents.map((i: any) => ({
        organization_id: ORG_ID, title: i.desc || i.id,
        severity: i.sev || 'low', status: i.status || 'open',
        description: i.desc || '', root_cause: i.root || '',
        downtime: i.down || '', actions: i.acts || [],
        timeline: i.timeline || [], owner_user_id: USER_ID,
        metadata: { legacy_id: i.id, reported: i.reported },
      }))
      const { error } = await sb.from('incidents').insert(rows)
      results.incidents = error ? error.message : `${rows.length} migrated`
    }

    // Migrate fleet
    if (D.fleet) {
      const rows = D.fleet.map((f: any) => ({
        organization_id: ORG_ID, unit_name: f.unit,
        unit_type: f.type || '', status: f.status || 'active',
        hours: f.hours || 0, health: f.health || 0,
        location: f.loc || '', config: f.config || '',
        systems: f.sys || [],
        metadata: { legacy_id: f.id, lastMaint: f.lastMaint, nextMaint: f.nextMaint },
      }))
      const { error } = await sb.from('fleet').insert(rows)
      results.fleet = error ? error.message : `${rows.length} migrated`
    }

    // Migrate experiments
    if (D.exps) {
      const rows = D.exps.map((e: any) => ({
        organization_id: ORG_ID, title: e.title || e.id,
        outcome: e.outcome || null, confidence: e.conf || 0,
        date: e.date ? new Date(`${e.date} 2026`).toISOString() : null,
        parameters: e.p || [], conclusion: e.conclusion || '',
        metadata: { legacy_id: e.id },
      }))
      const { error } = await sb.from('experiments').insert(rows)
      results.experiments = error ? error.message : `${rows.length} migrated`
    }

    // Migrate milestones
    if (D.milestones) {
      const rows = D.milestones.map((m: any) => ({
        organization_id: ORG_ID, title: m.title,
        target_date: m.target ? new Date(`${m.target} 2026`).toISOString() : null,
        progress: m.pct || 0, risk_level: m.risk || 'low',
        blockers: m.blockers || [], criteria: m.cr || [],
        dependencies: m.deps || [],
        metadata: { legacy_id: m.id },
      }))
      const { error } = await sb.from('milestones').insert(rows)
      results.milestones = error ? error.message : `${rows.length} migrated`
    }

    // Migrate safety
    if (D.safety) {
      const rows = D.safety.map((s: any) => ({
        organization_id: ORG_ID, name: s.name,
        coverage: s.cov || 0, gaps: s.gaps || [],
      }))
      const { error } = await sb.from('safety_standards').insert(rows)
      results.safety = error ? error.message : `${rows.length} migrated`
    }

    // Migrate finance
    if (D.fin) {
      const { error } = await sb.from('finance_snapshots').insert({
        organization_id: ORG_ID,
        month: new Date().toISOString().slice(0, 7),
        burn_rate: D.fin.burn || 0,
        cash_on_hand: D.fin.cash || 0,
        runway_months: D.fin.runway || 0,
        bom_cost: D.fin.bom || 0,
        spend_breakdown: D.fin.spend || [],
        created_by: USER_ID,
      })
      results.finance = error ? error.message : 'migrated'
    }

    // Migrate supply
    if (D.supply) {
      const rows = D.supply.map((s: any) => ({
        organization_id: ORG_ID, item_name: s.item,
        supplier: s.supplier || '', lead_time: s.lead || '',
        risk_level: s.risk || 'low', notes: s.note || '',
      }))
      const { error } = await sb.from('supply_items').insert(rows)
      results.supply = error ? error.message : `${rows.length} migrated`
    }

    // Migrate notes (embedded in various entities)
    const noteRows: any[] = []
    const addNotes = (items: any[], entityType: string) => {
      for (const item of items || []) {
        for (const note of item.notes || []) {
          noteRows.push({
            organization_id: ORG_ID,
            entity_type: entityType,
            entity_id: item.id || 'unknown',
            author_user_id: USER_ID,
            body: note.t || note.text || String(note),
          })
        }
      }
    }
    addNotes(D.ss, 'subsystem')
    addNotes(D.tasks, 'task')
    addNotes(D.pilots, 'pilot')
    addNotes(D.investors, 'investor')
    addNotes(D.incidents, 'incident')
    addNotes(D.exps, 'experiment')

    if (noteRows.length > 0) {
      const { error } = await sb.from('notes').insert(noteRows)
      results.notes = error ? error.message : `${noteRows.length} migrated`
    }

    return NextResponse.json({ ok: true, results })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
