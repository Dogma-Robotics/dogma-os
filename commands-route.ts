// POST /api/commands — Execute a domain command (from approval queue or direct)
import { NextRequest, NextResponse } from 'next/server'
import { resolveSession, logAudit } from '@/lib/auth'
import { executeCommand } from '@/lib/commands'

export async function POST(req: NextRequest) {
  try {
    const auth = await resolveSession()
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
    const ctx = auth.ctx

    const { command, input } = await req.json()
    if (!command) return NextResponse.json({ error: 'Missing command name' }, { status: 400 })

    const result = await executeCommand(ctx, command, input || {})

    if (result.ok) {
      await logAudit(ctx, 'approve_mutation', command, input?.task_id || input?.pilot_id || input?.incident_id || input?.entity_id || 'unknown', null, result.entity, 'approved')
    }

    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
