import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readdir, unlink } from 'fs/promises'
import { join } from 'path'
import { homedir } from 'os'

const MEMORY_DIR = join(homedir(), '.openclaw', 'workspace', 'memory')

// POST: save a file to OpenClaw memory
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const nodeId = formData.get('nodeId') as string || 'unknown'
    const nodeName = formData.get('nodeName') as string || ''

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Prefix filename with node context for organization
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileName = `node-${nodeId}--${safeName}`
    const filePath = join(MEMORY_DIR, fileName)

    await writeFile(filePath, buffer)

    // For text-based files, also create a summary .md file
    const textTypes = ['.txt', '.md', '.csv', '.json', '.tex', '.jsx', '.tsx', '.ts', '.py', '.yaml', '.yml']
    const isText = textTypes.some(ext => file.name.toLowerCase().endsWith(ext))

    if (isText) {
      const text = buffer.toString('utf-8')
      const summaryName = `node-${nodeId}--${safeName}.context.md`
      const summaryContent = `# ${file.name}\n\nUploaded to node: ${nodeName} (${nodeId})\nDate: ${new Date().toISOString()}\nSize: ${file.size} bytes\nType: ${file.type || 'text'}\n\n## Content\n\n${text.slice(0, 50000)}`
      await writeFile(join(MEMORY_DIR, summaryName), summaryContent, 'utf-8')
    }

    return NextResponse.json({
      ok: true,
      fileName,
      path: filePath,
      size: file.size,
      savedToMemory: true
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// GET: list files in OpenClaw memory
export async function GET() {
  try {
    const files = await readdir(MEMORY_DIR)
    return NextResponse.json({
      files: files.filter(f => !f.startsWith('.')).map(f => ({ name: f }))
    })
  } catch (e: any) {
    return NextResponse.json({ files: [], error: e.message })
  }
}

// DELETE: remove a file from OpenClaw memory
export async function DELETE(req: NextRequest) {
  try {
    const { fileName } = await req.json()
    if (!fileName) return NextResponse.json({ error: 'No fileName' }, { status: 400 })
    // Safety: only allow deleting files that start with "node-"
    if (!fileName.startsWith('node-')) {
      return NextResponse.json({ error: 'Can only delete node-uploaded files' }, { status: 403 })
    }
    await unlink(join(MEMORY_DIR, fileName))
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
