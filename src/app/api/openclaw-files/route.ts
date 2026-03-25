import { NextRequest, NextResponse } from 'next/server'
import { readFile, readdir, stat } from 'fs/promises'
import { join } from 'path'
import { homedir } from 'os'

const WORKSPACE = join(homedir(), '.openclaw', 'workspace')
const MEMORY = join(WORKSPACE, 'memory')

const MIME: Record<string, string> = {
  html: 'text/html', htm: 'text/html', md: 'text/markdown', txt: 'text/plain',
  csv: 'text/csv', json: 'application/json', pdf: 'application/pdf',
  tex: 'text/x-latex', jsx: 'text/javascript', tsx: 'text/javascript',
  ts: 'text/javascript', js: 'text/javascript', py: 'text/x-python',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml',
  gif: 'image/gif', webp: 'image/webp',
}

// GET ?file=name — serve a file from workspace or memory
// GET (no params) — list all files from both dirs
export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.searchParams.get('file')

  if (fileName) {
    const safe = fileName.replace(/\.\./g, '')
    // Try workspace first, then memory
    for (const dir of [WORKSPACE, MEMORY]) {
      try {
        const content = await readFile(join(dir, safe))
        const ext = safe.split('.').pop()?.toLowerCase() || ''
        return new NextResponse(content, {
          headers: {
            'content-type': MIME[ext] || 'application/octet-stream',
            'content-disposition': `inline; filename="${safe}"`,
          }
        })
      } catch {}
    }
    return new NextResponse('File not found: ' + safe, { status: 404 })
  }

  // List all files from workspace + memory
  try {
    const wsFiles = await readdir(WORKSPACE)
    const memFiles = await readdir(MEMORY)

    const allFiles = []
    for (const f of wsFiles) {
      if (f.startsWith('.') || f === 'memory' || f === '.git' || f === '.openclaw' || f === 'ansible') continue
      try {
        const s = await stat(join(WORKSPACE, f))
        if (s.isFile()) allFiles.push({ name: f, dir: 'workspace', size: s.size, modified: s.mtime.toISOString() })
      } catch {}
    }
    for (const f of memFiles) {
      if (f.startsWith('.') || f.endsWith('.context.md')) continue
      try {
        const s = await stat(join(MEMORY, f))
        if (s.isFile()) allFiles.push({ name: f, dir: 'memory', size: s.size, modified: s.mtime.toISOString() })
      } catch {}
    }

    return NextResponse.json({ files: allFiles })
  } catch (e: any) {
    return NextResponse.json({ files: [], error: e.message })
  }
}
