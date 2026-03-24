import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || ''
  if (!url || !key) return null
  return createClient(url, key)
}

// GET /api/comments?entity_type=task&entity_id=xxx
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const entityType = searchParams.get('entity_type')
    const entityId = searchParams.get('entity_id')
    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'Missing entity_type or entity_id' }, { status: 400 })
    }

    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data, error } = await sb
      .from('comments')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: true })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ comments: data || [] })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// POST /api/comments  { entity_type, entity_id, author, text }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { entity_type, entity_id, author, text } = body

    if (!entity_type || !entity_id || !text) {
      return NextResponse.json({ error: 'Missing entity_type, entity_id, or text' }, { status: 400 })
    }

    const sb = getSupabase()
    if (!sb) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

    const { data, error } = await sb
      .from('comments')
      .insert({
        entity_type,
        entity_id,
        author: author || 'Jero',
        text,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ comment: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
