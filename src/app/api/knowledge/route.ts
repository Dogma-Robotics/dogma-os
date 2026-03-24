import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const sbUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = sbUrl && sbKey ? createClient(sbUrl, sbKey) : null

// GET: ?type=nodes or ?type=rows&node_id=xxx
export async function GET(req: NextRequest) {
  if (!supabase) return NextResponse.json({ nodes: [], rows: [] })
  const type = req.nextUrl.searchParams.get('type') || 'nodes'
  const nodeId = req.nextUrl.searchParams.get('node_id')

  try {
    if (type === 'nodes') {
      const { data, error } = await supabase.from('knowledge_nodes').select('*').order('sort_order')
      if (error) throw error
      return NextResponse.json({ nodes: data || [] })
    }

    if (type === 'rows' && nodeId) {
      const { data, error } = await supabase.from('node_rows').select('*').eq('node_id', nodeId).order('created_at')
      if (error) throw error
      return NextResponse.json({ rows: (data || []).map(r => ({ id: r.id, node_id: r.node_id, ...r.data })) })
    }

    return NextResponse.json({ nodes: [], rows: [] })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// POST: create node or row
export async function POST(req: NextRequest) {
  if (!supabase) return NextResponse.json({ error: 'No database' }, { status: 503 })
  try {
    const body = await req.json()
    const { type, ...payload } = body

    if (type === 'node') {
      const { id, parent_id, label, icon, description, db_table, level, sort_order } = payload
      const { error } = await supabase.from('knowledge_nodes').upsert({
        id, parent_id, label, icon: icon || '📄', description: description || '',
        db_table: db_table || 'subsystems', level: level || 0, sort_order: sort_order || 0
      })
      if (error) throw error
      return NextResponse.json({ ok: true })
    }

    if (type === 'row') {
      const { id, node_id, ...data } = payload
      const { error } = await supabase.from('node_rows').upsert({
        id: id || 'row_' + Date.now(), node_id, data
      })
      if (error) throw error
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// PATCH: update node or row
export async function PATCH(req: NextRequest) {
  if (!supabase) return NextResponse.json({ error: 'No database' }, { status: 503 })
  try {
    const body = await req.json()
    const { type, id, ...updates } = body

    if (type === 'node') {
      const { error } = await supabase.from('knowledge_nodes').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id)
      if (error) throw error
      return NextResponse.json({ ok: true })
    }

    if (type === 'row') {
      const { data: existing } = await supabase.from('node_rows').select('data').eq('id', id).single()
      const merged = { ...(existing?.data || {}), ...updates }
      const { error } = await supabase.from('node_rows').update({ data: merged, updated_at: new Date().toISOString() }).eq('id', id)
      if (error) throw error
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// DELETE: delete node or row
export async function DELETE(req: NextRequest) {
  if (!supabase) return NextResponse.json({ error: 'No database' }, { status: 503 })
  try {
    const body = await req.json()
    const { type, id } = body

    if (type === 'node') {
      // Delete node and all its rows (CASCADE)
      const { error } = await supabase.from('knowledge_nodes').delete().eq('id', id)
      if (error) throw error
      return NextResponse.json({ ok: true })
    }

    if (type === 'row') {
      const { error } = await supabase.from('node_rows').delete().eq('id', id)
      if (error) throw error
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
