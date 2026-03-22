// GET /api/dashboard/summary — org-scoped dashboard data
import { NextResponse } from 'next/server'
import { resolveSession, hasPermission } from '@/lib/auth'
import { getSupabase } from '@/lib/auth'

export async function GET() {
  const auth = await resolveSession()
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const ctx = auth.ctx
  const sb = getSupabase()
  if (!sb) return NextResponse.json({ error: 'DB unavailable' }, { status: 500 })
  const orgId = ctx.organizationId

  try {
    // Fetch all domain data in parallel
    const [
      { data: subsystems },
      { data: skills },
      { data: tasks },
      { data: pilots },
      { data: investors },
      { data: incidents },
      { data: fleet },
      { data: milestones },
      { data: safety },
      { data: experiments },
      { data: finance },
      { data: supply },
    ] = await Promise.all([
      sb.from('subsystems').select('*').eq('organization_id', orgId).order('created_at'),
      sb.from('skills').select('*').eq('organization_id', orgId).order('created_at'),
      sb.from('tasks').select('*').eq('organization_id', orgId).order('priority', { ascending: false }),
      hasPermission(ctx, 'read:pilots') ? sb.from('pilots').select('*').eq('organization_id', orgId).order('viability_score', { ascending: false }) : Promise.resolve({ data: [] }),
      hasPermission(ctx, 'read:investors') ? sb.from('investors').select('*').eq('organization_id', orgId).order('probability', { ascending: false }) : Promise.resolve({ data: [] }),
      sb.from('incidents').select('*').eq('organization_id', orgId).order('created_at', { ascending: false }),
      sb.from('fleet').select('*').eq('organization_id', orgId),
      sb.from('milestones').select('*').eq('organization_id', orgId).order('target_date'),
      sb.from('safety_standards').select('*').eq('organization_id', orgId),
      sb.from('experiments').select('*').eq('organization_id', orgId).order('date', { ascending: false }),
      sb.from('finance_snapshots').select('*').eq('organization_id', orgId).order('month', { ascending: false }).limit(1),
      sb.from('supply_items').select('*').eq('organization_id', orgId),
    ])

    // Compute summary metrics
    const avgMaturity = subsystems?.length ? Math.round(subsystems.reduce((a: number, s: any) => a + (s.maturity_level || 0), 0) / subsystems.length) : 0
    const openIncidents = incidents?.filter((i: any) => i.status !== 'resolved').length || 0
    const criticalTasks = tasks?.filter((t: any) => t.priority === 'critical' && t.status !== 'done').length || 0
    const fin = finance?.[0] || { burn_rate: 0, cash_on_hand: 0, runway_months: 0, bom_cost: 0, spend_breakdown: [] }

    return NextResponse.json({
      user: { id: ctx.userId, name: ctx.name, role: ctx.role },
      organization: { id: ctx.organizationId, slug: ctx.organizationSlug },
      summary: {
        avgMaturity,
        openIncidents,
        criticalTasks,
        totalPilots: pilots?.length || 0,
        totalInvestors: investors?.length || 0,
        runway: fin.runway_months,
        burn: fin.burn_rate,
        cash: fin.cash_on_hand,
      },
      // Domain data (filtered by permissions)
      ss: subsystems || [],
      skills: skills || [],
      tasks: tasks || [],
      pilots: pilots || [],
      investors: investors || [],
      incidents: incidents || [],
      fleet: fleet || [],
      milestones: milestones || [],
      safety: safety || [],
      exps: experiments || [],
      fin: {
        burn: fin.burn_rate || 0,
        cash: fin.cash_on_hand || 0,
        runway: fin.runway_months || 0,
        bom: fin.bom_cost || 0,
        spend: fin.spend_breakdown || [],
      },
      supply: supply || [],
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
