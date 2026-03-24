'use client'
import { useState } from 'react'
import { C } from '@/lib/theme'

interface AutomationRule {
  id: string
  name: string
  trigger: { type: 'field_change' | 'schedule' | 'threshold'; field?: string; value?: string; cron?: string }
  condition: { field: string; operator: 'equals' | 'gt' | 'lt' | 'contains'; value: string } | null
  action: { type: 'update_field' | 'create_row' | 'notify' | 'run_agent'; target?: string; value?: string; agentId?: string; message?: string }
  enabled: boolean
}

interface AutomationsPanelProps {
  rules: AutomationRule[]
  onAddRule: (rule: AutomationRule) => void
  onDeleteRule: (id: string) => void
  onToggleRule: (id: string) => void
  agents: { id: string; name: string; icon: string }[]
}

const inputStyle: React.CSSProperties = {
  background: C.bg2,
  border: `1px solid ${C.bd}`,
  borderRadius: 5,
  color: C.tx,
  fontSize: 12,
  padding: '6px 8px',
  outline: 'none',
  width: '100%',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
  width: 'auto',
  minWidth: 120,
}

const labelStyle: React.CSSProperties = {
  color: C.tx3,
  fontSize: 10,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 3,
}

const TRIGGER_TYPES = ['field_change', 'schedule', 'threshold'] as const
const OPERATORS = ['equals', 'gt', 'lt', 'contains'] as const
const ACTION_TYPES = ['update_field', 'create_row', 'notify', 'run_agent'] as const

function triggerLabel(t: AutomationRule['trigger']): string {
  if (t.type === 'field_change') return `When "${t.field}" changes to "${t.value}"`
  if (t.type === 'schedule') return `Every ${t.cron ?? 'schedule'}`
  if (t.type === 'threshold') return `When "${t.field}" > ${t.value}`
  return 'Unknown trigger'
}

function conditionLabel(c: AutomationRule['condition']): string | null {
  if (!c) return null
  const opMap: Record<string, string> = { equals: '=', gt: '>', lt: '<', contains: 'contains' }
  return `If "${c.field}" ${opMap[c.operator] ?? c.operator} "${c.value}"`
}

function actionLabel(a: AutomationRule['action']): string {
  if (a.type === 'update_field') return `Update "${a.target}" to "${a.value}"`
  if (a.type === 'create_row') return 'Create new row'
  if (a.type === 'notify') return `Notify: ${a.message ?? ''}`
  if (a.type === 'run_agent') return `Run agent ${a.agentId ?? ''}`
  return 'Unknown action'
}

function emptyForm(): Omit<AutomationRule, 'id'> {
  return {
    name: '',
    trigger: { type: 'field_change', field: '', value: '' },
    condition: null,
    action: { type: 'update_field', target: '', value: '' },
    enabled: true,
  }
}

export default function AutomationsPanel({ rules, onAddRule, onDeleteRule, onToggleRule, agents }: AutomationsPanelProps) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<AutomationRule, 'id'>>(emptyForm())
  const [useCondition, setUseCondition] = useState(false)

  const handleSave = () => {
    if (!form.name.trim()) return
    onAddRule({
      ...form,
      id: crypto.randomUUID(),
      condition: useCondition ? form.condition : null,
    })
    setForm(emptyForm())
    setUseCondition(false)
    setShowForm(false)
  }

  const updateTrigger = (patch: Partial<AutomationRule['trigger']>) =>
    setForm((f) => ({ ...f, trigger: { ...f.trigger, ...patch } }))

  const updateCondition = (patch: Partial<NonNullable<AutomationRule['condition']>>) =>
    setForm((f) => ({
      ...f,
      condition: { field: '', operator: 'equals' as const, value: '', ...f.condition, ...patch },
    }))

  const updateAction = (patch: Partial<AutomationRule['action']>) =>
    setForm((f) => ({ ...f, action: { ...f.action, ...patch } }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: C.tx, fontSize: 14, fontWeight: 600 }}>Automations</div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? C.bg2 : `${C.gold}18`,
            border: `1px solid ${showForm ? C.bd : C.gold}44`,
            borderRadius: 5,
            color: C.gold,
            fontSize: 12,
            fontWeight: 500,
            padding: '5px 12px',
            cursor: 'pointer',
          }}
        >
          {showForm ? 'Cancel' : '+ New Automation'}
        </button>
      </div>

      {/* New automation form */}
      {showForm && (
        <div
          style={{
            background: C.bg1,
            border: `1px solid ${C.gold}33`,
            borderRadius: 8,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {/* Name */}
          <div>
            <div style={labelStyle}>Name</div>
            <input
              style={inputStyle}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Automation name"
            />
          </div>

          {/* Trigger */}
          <div>
            <div style={labelStyle}>Trigger</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              <select
                style={selectStyle}
                value={form.trigger.type}
                onChange={(e) =>
                  updateTrigger({ type: e.target.value as AutomationRule['trigger']['type'] })
                }
              >
                <option value="field_change">When field changes</option>
                <option value="schedule">On schedule</option>
                <option value="threshold">When threshold exceeded</option>
              </select>
              {form.trigger.type === 'field_change' && (
                <>
                  <input
                    style={{ ...inputStyle, width: 120 }}
                    placeholder="Field name"
                    value={form.trigger.field ?? ''}
                    onChange={(e) => updateTrigger({ field: e.target.value })}
                  />
                  <span style={{ color: C.tx3, fontSize: 11 }}>changes to</span>
                  <input
                    style={{ ...inputStyle, width: 120 }}
                    placeholder="Value"
                    value={form.trigger.value ?? ''}
                    onChange={(e) => updateTrigger({ value: e.target.value })}
                  />
                </>
              )}
              {form.trigger.type === 'schedule' && (
                <input
                  style={{ ...inputStyle, width: 200 }}
                  placeholder="Cron expression (e.g. 0 9 * * 1)"
                  value={form.trigger.cron ?? ''}
                  onChange={(e) => updateTrigger({ cron: e.target.value })}
                />
              )}
              {form.trigger.type === 'threshold' && (
                <>
                  <span style={{ color: C.tx3, fontSize: 11 }}>When</span>
                  <input
                    style={{ ...inputStyle, width: 120 }}
                    placeholder="Field name"
                    value={form.trigger.field ?? ''}
                    onChange={(e) => updateTrigger({ field: e.target.value })}
                  />
                  <span style={{ color: C.tx3, fontSize: 11 }}>&gt;</span>
                  <input
                    style={{ ...inputStyle, width: 80 }}
                    placeholder="Threshold"
                    value={form.trigger.value ?? ''}
                    onChange={(e) => updateTrigger({ value: e.target.value })}
                  />
                </>
              )}
            </div>
          </div>

          {/* Condition */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={labelStyle}>Condition (optional)</div>
              <button
                onClick={() => setUseCondition(!useCondition)}
                style={{
                  background: useCondition ? `${C.gold}22` : C.bg2,
                  border: `1px solid ${useCondition ? C.gold : C.bd}44`,
                  borderRadius: 4,
                  color: useCondition ? C.gold : C.tx3,
                  fontSize: 10,
                  padding: '2px 8px',
                  cursor: 'pointer',
                }}
              >
                {useCondition ? 'On' : 'Off'}
              </button>
            </div>
            {useCondition && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ color: C.tx3, fontSize: 11 }}>If</span>
                <input
                  style={{ ...inputStyle, width: 120 }}
                  placeholder="Field"
                  value={form.condition?.field ?? ''}
                  onChange={(e) => updateCondition({ field: e.target.value })}
                />
                <select
                  style={selectStyle}
                  value={form.condition?.operator ?? 'equals'}
                  onChange={(e) =>
                    updateCondition({ operator: e.target.value as 'equals' | 'gt' | 'lt' | 'contains' })
                  }
                >
                  <option value="equals">equals</option>
                  <option value="gt">greater than</option>
                  <option value="lt">less than</option>
                  <option value="contains">contains</option>
                </select>
                <input
                  style={{ ...inputStyle, width: 120 }}
                  placeholder="Value"
                  value={form.condition?.value ?? ''}
                  onChange={(e) => updateCondition({ value: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Action */}
          <div>
            <div style={labelStyle}>Action</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              <select
                style={selectStyle}
                value={form.action.type}
                onChange={(e) =>
                  updateAction({ type: e.target.value as AutomationRule['action']['type'] })
                }
              >
                <option value="update_field">Update field</option>
                <option value="create_row">Create new row</option>
                <option value="notify">Send notification</option>
                <option value="run_agent">Run agent</option>
              </select>
              {form.action.type === 'update_field' && (
                <>
                  <input
                    style={{ ...inputStyle, width: 120 }}
                    placeholder="Field"
                    value={form.action.target ?? ''}
                    onChange={(e) => updateAction({ target: e.target.value })}
                  />
                  <span style={{ color: C.tx3, fontSize: 11 }}>to</span>
                  <input
                    style={{ ...inputStyle, width: 120 }}
                    placeholder="Value"
                    value={form.action.value ?? ''}
                    onChange={(e) => updateAction({ value: e.target.value })}
                  />
                </>
              )}
              {form.action.type === 'notify' && (
                <input
                  style={{ ...inputStyle, width: 240 }}
                  placeholder="Notification message"
                  value={form.action.message ?? ''}
                  onChange={(e) => updateAction({ message: e.target.value })}
                />
              )}
              {form.action.type === 'run_agent' && (
                <>
                  <select
                    style={selectStyle}
                    value={form.action.agentId ?? ''}
                    onChange={(e) => updateAction({ agentId: e.target.value })}
                  >
                    <option value="">Select agent</option>
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.icon} {a.name}
                      </option>
                    ))}
                  </select>
                  <input
                    style={{ ...inputStyle, width: 200 }}
                    placeholder="Message for agent"
                    value={form.action.message ?? ''}
                    onChange={(e) => updateAction({ message: e.target.value })}
                  />
                </>
              )}
            </div>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            style={{
              alignSelf: 'flex-end',
              background: `${C.gold}22`,
              border: `1px solid ${C.gold}55`,
              borderRadius: 5,
              color: C.gold,
              fontSize: 12,
              fontWeight: 600,
              padding: '6px 20px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = `${C.gold}33`)}
            onMouseLeave={(e) => (e.currentTarget.style.background = `${C.gold}22`)}
          >
            Save Automation
          </button>
        </div>
      )}

      {/* Rules list */}
      {rules.length === 0 && !showForm && (
        <div style={{ color: C.tx3, fontSize: 12, textAlign: 'center', padding: 24 }}>
          No automations yet. Create one to automate your workflow.
        </div>
      )}

      {rules.map((rule) => (
        <div
          key={rule.id}
          style={{
            background: C.bg1,
            border: `1px solid ${rule.enabled ? C.bd : `${C.bd}66`}`,
            borderRadius: 8,
            padding: '12px 14px',
            opacity: rule.enabled ? 1 : 0.55,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {/* Rule header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ color: C.tx, fontSize: 13, fontWeight: 600, flex: 1 }}>{rule.name}</div>
            {/* Toggle */}
            <button
              onClick={() => onToggleRule(rule.id)}
              style={{
                width: 36,
                height: 20,
                borderRadius: 10,
                border: 'none',
                background: rule.enabled ? `${C.gold}44` : C.bg2,
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 3,
                  left: rule.enabled ? 19 : 3,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: rule.enabled ? C.gold : C.tx3,
                  transition: 'left 0.2s, background 0.2s',
                }}
              />
            </button>
            {/* Delete */}
            <button
              onClick={() => onDeleteRule(rule.id)}
              style={{
                background: 'transparent',
                border: `1px solid ${C.bd}`,
                borderRadius: 4,
                color: C.tx3,
                fontSize: 11,
                padding: '3px 8px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8A3333'
                e.currentTarget.style.color = '#8A3333'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.bd
                e.currentTarget.style.color = C.tx3
              }}
            >
              Delete
            </button>
          </div>

          {/* Flow visualization: trigger -> condition -> action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {/* Trigger */}
            <span
              style={{
                fontSize: 11,
                color: C.gold,
                background: `${C.gold}12`,
                border: `1px solid ${C.gold}33`,
                borderRadius: 4,
                padding: '3px 8px',
              }}
            >
              {triggerLabel(rule.trigger)}
            </span>

            <span style={{ color: C.tx3, fontSize: 13 }}>{'\u2192'}</span>

            {/* Condition */}
            {rule.condition && (
              <>
                <span
                  style={{
                    fontSize: 11,
                    color: C.tx2,
                    background: C.bg2,
                    border: `1px solid ${C.bd}`,
                    borderRadius: 4,
                    padding: '3px 8px',
                  }}
                >
                  {conditionLabel(rule.condition)}
                </span>
                <span style={{ color: C.tx3, fontSize: 13 }}>{'\u2192'}</span>
              </>
            )}

            {/* Action */}
            <span
              style={{
                fontSize: 11,
                color: '#2D7A5D',
                background: 'rgba(45,122,93,0.1)',
                border: '1px solid rgba(45,122,93,0.3)',
                borderRadius: 4,
                padding: '3px 8px',
              }}
            >
              {actionLabel(rule.action)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
