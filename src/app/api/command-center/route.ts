import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { homedir } from 'os'

const MEMORY_DIR = join(homedir(), '.openclaw', 'workspace', 'memory')

// This endpoint allows OpenClaw agents to read/write Command Center data
// Data is stored in OpenClaw memory as a JSON file

const DATA_FILE = join(MEMORY_DIR, 'dogma-command-center.json')

async function loadData(): Promise<any> {
  try {
    const { readFile } = await import('fs/promises')
    const raw = await readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function saveData(data: any): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
  // Also write a human-readable summary for the agent
  const summary = `# DOGMA Command Center — Live Data
Updated: ${new Date().toISOString()}

## Finance
- Burn: $${data.fin?.burn || 0}/mo
- Cash: $${data.fin?.cash || 0}
- Runway: ${data.fin?.runway || 0} months
- BOM: $${data.fin?.bom || 0}/unit

## Control Modules M0-M9
${Object.entries(data._moduleStatus || {}).map(([k, v]) => `- ${k}: ${v}`).join('\n') || '(all planned)'}

## Pilots (${(data.pilots || []).length})
${(data.pilots || []).map((p: any) => `- ${p.name}: ${p.stage} (${p.viab}%)`).join('\n')}

## Tasks (${(data.tasks || []).length})
${(data.tasks || []).map((t: any) => `- [${t.pri}] ${t.title} (${t.pct || 0}%)`).join('\n')}

## Incidents (${(data.incidents || []).filter((i: any) => i.status !== 'resolved').length} open)
${(data.incidents || []).filter((i: any) => i.status !== 'resolved').map((i: any) => `- ${i.id}: ${i.desc} [${i.sev}]`).join('\n')}

## Subsystems
${(data.ss || []).map((s: any) => `- ${s.name}: ${s.mat}% (${s.status})`).join('\n')}

## Decisions
${(data.decisions || []).map((d: any) => `- ${d.title}: ${d.why}`).join('\n')}
`
  await writeFile(join(MEMORY_DIR, 'dogma-command-center-summary.md'), summary, 'utf-8')
}

// GET: read current command center data
export async function GET() {
  const data = await loadData()
  return NextResponse.json(data || { error: 'No data saved yet' })
}

// POST: update command center data (full or partial)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // If "action" field, handle specific mutations
    if (body.action) {
      const current = await loadData() || {}
      const { action, ...params } = body

      if (action === 'update_finance') {
        current.fin = current.fin || {}
        current.fin[params.field] = parseFloat(params.value) || 0
      }
      else if (action === 'update_module_status') {
        current._moduleStatus = current._moduleStatus || {}
        current._moduleStatus[params.module_id] = params.status
      }
      else if (action === 'update_subsystem') {
        const ss = current.ss || []
        const idx = ss.findIndex((s: any) => s.name === params.name || s.id === params.id)
        if (idx >= 0) ss[idx][params.field || 'mat'] = params.value
      }
      else if (action === 'add_pilot') {
        current.pilots = current.pilots || []
        current.pilots.push({ id: 'p_' + Date.now(), name: params.name, stage: params.stage || 'Identified', viab: parseInt(params.viab) || 0, roi: params.roi || '', risk: params.risk || 'medium' })
      }
      else if (action === 'add_task') {
        current.tasks = current.tasks || []
        current.tasks.push({ id: 't_' + Date.now(), title: params.title, pri: params.priority || 'medium', status: 'todo', pct: 0, owner: params.owner || 'Jero' })
      }
      else if (action === 'add_incident') {
        current.incidents = current.incidents || []
        current.incidents.push({ id: 'INC-' + Date.now(), desc: params.description, sev: params.severity || 'medium', status: 'open' })
      }
      else if (action === 'resolve_incident') {
        const inc = (current.incidents || []).find((i: any) => i.id === params.id)
        if (inc) inc.status = 'resolved'
      }
      else if (action === 'add_decision') {
        current.decisions = current.decisions || []
        current.decisions.push({ title: params.title, why: params.why || '', date: new Date().toLocaleDateString() })
      }
      else if (action === 'full_update') {
        // Replace entire data
        Object.assign(current, params.data || {})
      }

      await saveData(current)
      return NextResponse.json({ ok: true, action })
    }

    // Full data save
    await saveData(body)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
