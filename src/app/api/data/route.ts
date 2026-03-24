import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ALLOWED_TABLES = [
  'subsystems', 'tasks', 'pilots', 'investors',
  'incidents', 'finance_snapshots', 'milestones', 'supply_chain',
]

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || ''
  if (!url || !key) return null
  return createClient(url, key)
}

function validateTable(table: string | null): string | null {
  if (!table || !ALLOWED_TABLES.includes(table)) return null
  return table
}

// GET /api/data?table=tasks
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const table = validateTable(searchParams.get('table'))
    if (!table) {
      return NextResponse.json({ error: 'Invalid or missing table. Allowed: ' + ALLOWED_TABLES.join(', ') }, { status: 400 })
    }

    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data, error } = await sb.from(table).select('*').order('created_at', { ascending: false })
    if (error) {
      // Fallback: try without ordering by created_at (some tables may not have it)
      const fallback = await sb.from(table).select('*')
      if (fallback.error) return NextResponse.json({ error: fallback.error.message }, { status: 500 })
      return NextResponse.json({ rows: fallback.data || [] })
    }
    return NextResponse.json({ rows: data || [] })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// POST /api/data  { table, data }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const table = validateTable(body.table)
    if (!table) {
      return NextResponse.json({ error: 'Invalid or missing table' }, { status: 400 })
    }

    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data, error } = await sb.from(table).insert(body.data).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ row: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// PATCH /api/data  { table, id, data }
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const table = validateTable(body.table)
    if (!table) {
      return NextResponse.json({ error: 'Invalid or missing table' }, { status: 400 })
    }
    if (!body.id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data, error } = await sb.from(table).update(body.data).eq('id', body.id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ row: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// DELETE /api/data  { table, id }
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const table = validateTable(body.table)
    if (!table) {
      return NextResponse.json({ error: 'Invalid or missing table' }, { status: 400 })
    }
    if (!body.id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { error } = await sb.from(table).delete().eq('id', body.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
