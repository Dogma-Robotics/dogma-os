// GET /api/artifacts/[name] — Serve files from private .dogma-storage
import { NextRequest, NextResponse } from 'next/server'
import { resolveSession, hasPermission } from '@/lib/auth'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const STORAGE_ROOT = join(process.cwd(), '.dogma-storage')
const PUBLIC_ROOT = join(process.cwd(), 'public', 'generated')

// MIME type lookup
const MIME: Record<string, string> = {
  html: 'text/html', csv: 'text/csv', json: 'application/json',
  md: 'text/markdown', tex: 'application/x-tex', pdf: 'application/pdf',
  png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml',
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { name } = await params
    const url = new URL(req.url)
    const orgId = url.searchParams.get('org') || '00000000-0000-0000-0000-000000000001'
    const visibility = url.searchParams.get('v') || 'internal'

    // Public files — no auth needed
    if (visibility === 'public') {
      const pubPath = join(PUBLIC_ROOT, name)
      if (existsSync(pubPath)) {
        const content = readFileSync(pubPath)
        const ext = name.split('.').pop() || ''
        return new NextResponse(content, {
          headers: {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            'Content-Disposition': `inline; filename="${name}"`,
            'Cache-Control': 'public, max-age=3600',
          }
        })
      }
    }

    // Internal/restricted files — require auth
    const auth = await resolveSession()
    if (!auth.ok) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    const ctx = auth.ctx

    // Check permission
    if (visibility === 'restricted' && !hasPermission(ctx, 'read:artifacts')) {
      return NextResponse.json({ error: 'Insufficient permissions for restricted artifacts' }, { status: 403 })
    }

    // Verify org match
    if (orgId !== ctx.organizationId) {
      return NextResponse.json({ error: 'Organization mismatch' }, { status: 403 })
    }

    // Serve from private storage
    const filePath = join(STORAGE_ROOT, orgId, visibility, name)
    if (!existsSync(filePath)) {
      // Fallback: check public/generated
      const fallbackPath = join(PUBLIC_ROOT, name)
      if (existsSync(fallbackPath)) {
        const content = readFileSync(fallbackPath)
        const ext = name.split('.').pop() || ''
        return new NextResponse(content, {
          headers: {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            'Content-Disposition': `inline; filename="${name}"`,
          }
        })
      }
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const content = readFileSync(filePath)
    const ext = name.split('.').pop() || ''

    return new NextResponse(content, {
      headers: {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${name}"`,
        'Cache-Control': visibility === 'restricted' ? 'no-store' : 'private, max-age=300',
        'X-Dogma-Visibility': visibility,
        'X-Dogma-Org': orgId,
      }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
