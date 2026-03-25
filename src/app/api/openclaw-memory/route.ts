import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readdir, unlink, stat, readFile } from 'fs/promises'
import { join } from 'path'
import { homedir } from 'os'

const MEMORY_DIR = join(homedir(), '.openclaw', 'workspace', 'memory')

// GET: list all files with metadata
export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.searchParams.get('file')

  // If ?file=xxx, return the file content
  if (fileName) {
    try {
      const safeName = fileName.replace(/\.\./g, '')
      const filePath = join(MEMORY_DIR, safeName)
      const content = await readFile(filePath)
      const ext = safeName.split('.').pop()?.toLowerCase() || ''
      const mimeMap: Record<string, string> = {
        md: 'text/markdown', txt: 'text/plain', csv: 'text/csv', json: 'application/json',
        tex: 'text/x-latex', jsx: 'text/javascript', tsx: 'text/javascript', ts: 'text/javascript',
        py: 'text/x-python', html: 'text/html', pdf: 'application/pdf',
        png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml', gif: 'image/gif',
      }
      return new NextResponse(content, {
        headers: {
          'content-type': mimeMap[ext] || 'application/octet-stream',
          'content-disposition': `inline; filename="${safeName}"`,
        }
      })
    } catch (e: any) {
      return new NextResponse('File not found', { status: 404 })
    }
  }

  // List all files with size and modified date
  try {
    const fileNames = await readdir(MEMORY_DIR)
    const files = await Promise.all(
      fileNames.filter(f => !f.startsWith('.')).map(async (name) => {
        try {
          const s = await stat(join(MEMORY_DIR, name))
          // Parse node association from prefix
          const nodeMatch = name.match(/^node-(.+?)--(.+)$/)
          return {
            name,
            displayName: nodeMatch ? nodeMatch[2] : name,
            nodeId: nodeMatch ? nodeMatch[1] : null,
            size: s.size,
            modified: s.mtime.toISOString(),
            isContext: name.endsWith('.context.md'),
          }
        } catch { return { name, displayName: name, nodeId: null, size: 0, modified: '', isContext: false } }
      })
    )
    return NextResponse.json({ files: files.filter(f => !f.isContext) })
  } catch (e: any) {
    return NextResponse.json({ files: [], error: e.message })
  }
}

// POST: save file
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const nodeId = formData.get('nodeId') as string || 'unknown'
    const nodeName = formData.get('nodeName') as string || ''
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileName = `node-${nodeId}--${safeName}`
    await writeFile(join(MEMORY_DIR, fileName), buffer)

    const textTypes = ['.txt', '.md', '.csv', '.json', '.tex', '.jsx', '.tsx', '.ts', '.py', '.yaml', '.yml']
    if (textTypes.some(ext => file.name.toLowerCase().endsWith(ext))) {
      const text = buffer.toString('utf-8')
      await writeFile(join(MEMORY_DIR, `node-${nodeId}--${safeName}.context.md`),
        `# ${file.name}\nNode: ${nodeName} (${nodeId})\nDate: ${new Date().toISOString()}\n\n${text.slice(0, 50000)}`, 'utf-8')
    }
    return NextResponse.json({ ok: true, fileName, size: file.size })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// DELETE: remove any file
export async function DELETE(req: NextRequest) {
  try {
    const { fileName } = await req.json()
    if (!fileName) return NextResponse.json({ error: 'No fileName' }, { status: 400 })
    const safeName = fileName.replace(/\.\./g, '')
    await unlink(join(MEMORY_DIR, safeName)).catch(() => {})
    // Also remove context file if exists
    await unlink(join(MEMORY_DIR, safeName + '.context.md')).catch(() => {})
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
