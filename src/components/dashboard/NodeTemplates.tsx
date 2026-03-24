'use client'

import { C } from '@/lib/theme'

interface NodeTemplate {
  id: string
  name: string
  icon: string
  description: string
  columns: { key: string; label: string; type: string; editable: boolean; width?: number }[]
  sampleRows: any[]
}

interface NodeTemplatesProps {
  onSelectTemplate: (template: NodeTemplate) => void
  canEdit: boolean
}

const TEMPLATES: NodeTemplate[] = [
  {
    id: 'sprint_board',
    name: 'Sprint Board',
    icon: '🏃',
    description: 'Track sprint tasks with status, priority, and ownership.',
    columns: [
      { key: 'task', label: 'Task', type: 'text', editable: true, width: 200 },
      { key: 'status', label: 'Status', type: 'status', editable: true, width: 110 },
      { key: 'priority', label: 'Priority', type: 'select', editable: true, width: 100 },
      { key: 'owner', label: 'Owner', type: 'text', editable: true, width: 120 },
      { key: 'due_date', label: 'Due Date', type: 'date', editable: true, width: 110 },
    ],
    sampleRows: [
      { task: 'Implement auth flow', status: 'in_progress', priority: 'high', owner: 'Jero', due_date: '2026-04-01' },
      { task: 'Write API tests', status: 'todo', priority: 'medium', owner: '', due_date: '' },
    ],
  },
  {
    id: 'pilot_pipeline',
    name: 'Pilot Pipeline',
    icon: '🚀',
    description: 'Manage pilot customers through stages with viability scoring.',
    columns: [
      { key: 'company', label: 'Company', type: 'text', editable: true, width: 180 },
      { key: 'stage', label: 'Stage', type: 'select', editable: true, width: 120 },
      { key: 'viability', label: 'Viability', type: 'number', editable: true, width: 90 },
      { key: 'champion', label: 'Champion', type: 'text', editable: true, width: 140 },
      { key: 'risk', label: 'Risk', type: 'select', editable: true, width: 100 },
    ],
    sampleRows: [
      { company: 'Acme Corp', stage: 'evaluation', viability: 8, champion: 'Jane D.', risk: 'low' },
    ],
  },
  {
    id: 'control_module',
    name: 'Control Module',
    icon: '⚙️',
    description: 'Track control systems with rates and criticality levels.',
    columns: [
      { key: 'name', label: 'Name', type: 'text', editable: true, width: 180 },
      { key: 'description', label: 'Description', type: 'text', editable: true, width: 200 },
      { key: 'rate_hz', label: 'Rate (Hz)', type: 'number', editable: true, width: 90 },
      { key: 'status', label: 'Status', type: 'status', editable: true, width: 110 },
      { key: 'criticality', label: 'Criticality', type: 'select', editable: true, width: 110 },
    ],
    sampleRows: [
      { name: 'PID Controller', description: 'Main loop controller', rate_hz: 100, status: 'active', criticality: 'critical' },
    ],
  },
  {
    id: 'risk_register',
    name: 'Risk Register',
    icon: '⚠️',
    description: 'Catalog risks with severity, probability, and mitigations.',
    columns: [
      { key: 'name', label: 'Risk', type: 'text', editable: true, width: 180 },
      { key: 'severity', label: 'Severity', type: 'select', editable: true, width: 100 },
      { key: 'probability', label: 'Probability', type: 'select', editable: true, width: 110 },
      { key: 'impact', label: 'Impact', type: 'text', editable: true, width: 160 },
      { key: 'owner', label: 'Owner', type: 'text', editable: true, width: 120 },
      { key: 'mitigation', label: 'Mitigation', type: 'text', editable: true, width: 200 },
    ],
    sampleRows: [
      { name: 'Supply delay', severity: 'high', probability: 'medium', impact: 'Production halt', owner: 'Ops', mitigation: 'Dual source' },
    ],
  },
  {
    id: 'meeting_notes',
    name: 'Meeting Notes',
    icon: '📋',
    description: 'Capture meeting decisions and action items.',
    columns: [
      { key: 'title', label: 'Title', type: 'text', editable: true, width: 200 },
      { key: 'date', label: 'Date', type: 'date', editable: true, width: 110 },
      { key: 'attendees', label: 'Attendees', type: 'text', editable: true, width: 160 },
      { key: 'decisions', label: 'Decisions', type: 'text', editable: true, width: 200 },
      { key: 'action_items', label: 'Action Items', type: 'text', editable: true, width: 200 },
    ],
    sampleRows: [
      { title: 'Weekly Sync', date: '2026-03-24', attendees: 'Team', decisions: '', action_items: '' },
    ],
  },
  {
    id: 'research_log',
    name: 'Research Log',
    icon: '🔬',
    description: 'Log research findings with confidence and sourcing.',
    columns: [
      { key: 'title', label: 'Title', type: 'text', editable: true, width: 200 },
      { key: 'date', label: 'Date', type: 'date', editable: true, width: 110 },
      { key: 'findings', label: 'Findings', type: 'text', editable: true, width: 240 },
      { key: 'confidence', label: 'Confidence', type: 'select', editable: true, width: 110 },
      { key: 'source', label: 'Source', type: 'text', editable: true, width: 160 },
    ],
    sampleRows: [
      { title: 'Material test', date: '2026-03-20', findings: 'Passed stress test', confidence: 'high', source: 'Lab report #42' },
    ],
  },
  {
    id: 'supply_chain',
    name: 'Supply Chain',
    icon: '📦',
    description: 'Track items, vendors, lead times, and costs.',
    columns: [
      { key: 'item', label: 'Item', type: 'text', editable: true, width: 180 },
      { key: 'vendor', label: 'Vendor', type: 'text', editable: true, width: 160 },
      { key: 'status', label: 'Status', type: 'status', editable: true, width: 110 },
      { key: 'lead_time', label: 'Lead Time', type: 'text', editable: true, width: 100 },
      { key: 'cost', label: 'Cost', type: 'number', editable: true, width: 100 },
    ],
    sampleRows: [
      { item: 'Servo Motor', vendor: 'MotionTech', status: 'active', lead_time: '14 days', cost: 450 },
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    icon: '✏️',
    description: 'Start from scratch with a minimal template.',
    columns: [
      { key: 'name', label: 'Name', type: 'text', editable: true, width: 200 },
      { key: 'description', label: 'Description', type: 'text', editable: true, width: 260 },
      { key: 'status', label: 'Status', type: 'status', editable: true, width: 110 },
    ],
    sampleRows: [],
  },
]

export default function NodeTemplates({ onSelectTemplate, canEdit }: NodeTemplatesProps) {
  return (
    <div style={{ background: C.bg1, border: `1px solid ${C.bd}`, borderRadius: 10, padding: 16 }}>
      <div style={{ color: C.gold, fontWeight: 600, fontSize: 14, letterSpacing: 0.3, marginBottom: 14 }}>
        Node Templates
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 10,
        }}
      >
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => canEdit && onSelectTemplate(tpl)}
            disabled={!canEdit}
            style={{
              background: C.bg2,
              border: `1px solid ${C.bd}`,
              borderRadius: 8,
              padding: 14,
              textAlign: 'left',
              cursor: canEdit ? 'pointer' : 'default',
              transition: 'border-color 0.15s',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
            onMouseEnter={(e) => {
              if (canEdit) (e.currentTarget.style.borderColor = C.gold)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.bd
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>{tpl.icon}</span>
              <span style={{ color: C.tx, fontWeight: 600, fontSize: 13 }}>{tpl.name}</span>
            </div>
            <div style={{ color: C.tx2, fontSize: 12, lineHeight: 1.4 }}>{tpl.description}</div>
            <div style={{ color: C.tx3, fontSize: 11, marginTop: 2 }}>
              {tpl.columns.length} column{tpl.columns.length !== 1 ? 's' : ''}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
