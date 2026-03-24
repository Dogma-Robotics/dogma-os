# DOGMA OS v3 — Architecture Plan & Migration Guide

## What exists now (v2)
- Single 2500-line `page.tsx` monolith
- Tabs: Chat, Timeline, Design, OpenClaw, Queue
- OpenClaw proxy via /api/chat → localhost:18789
- Supabase backend with subsystems, tasks, pilots, incidents, etc.
- Dark mode (removed light mode)

## What v3 needs (your request)
1. **Modular architecture** — 15+ files instead of 1 monolith
2. **Monday-like boards** — Each node is its own database view
3. **Per-task details** — Description, progress bar, criticality, comments, owner
4. **Settings panel** — Replace connections, show permissions/account type
5. **Clean top bar** — No duplicate "admin", intuitive layout
6. **Agent editing** — Agents can edit all node data via mutations
7. **Manual editing** — Inline click-to-edit on any cell
8. **AI context** — All data feeds into agent system prompt

---

## Phase 1: Core Refactor (Day 1)

### File structure
```
src/
├── lib/
│   ├── types.ts          ← All TypeScript interfaces
│   ├── theme.ts          ← Dark theme colors
│   ├── nodes.ts          ← Node tree config + column definitions
│   ├── agents.ts         ← Agent definitions (exists)
│   └── auth.ts           ← Auth helpers (exists)
├── hooks/
│   ├── useOpenClaw.ts    ← Gateway hook (exists)
│   ├── useNodeData.ts    ← CRUD hook for any node's data
│   └── useComments.ts    ← Comment thread hook
├── components/
│   ├── ui/
│   │   ├── Badge.tsx         ← Status/priority/criticality badges
│   │   ├── ProgressBar.tsx   ← Colored progress bar with %
│   │   ├── EditableCell.tsx  ← Click-to-edit text/number/select
│   │   ├── CommentThread.tsx ← Threaded comments per entity
│   │   ├── CodeBlock.tsx     ← Code with copy button
│   │   ├── MsgText.tsx       ← Markdown-lite renderer
│   │   └── TypeWriter.tsx    ← Letter-by-letter animation
│   └── dashboard/
│       ├── TopBar.tsx        ← Search + user pill + settings button
│       ├── Sidebar.tsx       ← Collapsible node tree
│       ├── NodeBoard.tsx     ← Monday-like table for any node
│       ├── TaskDetail.tsx    ← Expanded task view (desc, comments, owner)
│       ├── ChatPanel.tsx     ← Agent chat with streaming
│       ├── SettingsPanel.tsx ← Account, permissions, agent policies
│       ├── OpenClawPanel.tsx ← Gateway capabilities page
│       ├── DesignGuide.tsx   ← Brand guidelines + images
│       └── ThreeViz.tsx      ← 3D neural network
└── app/
    ├── dashboard/page.tsx    ← Thin wrapper composing components
    └── api/
        ├── chat/route.ts     ← OpenClaw proxy (exists)
        ├── data/route.ts     ← Generic CRUD for any supabase table
        └── comments/route.ts ← Comment CRUD
```

### Supabase schema additions
```sql
-- Comments table (works for any entity)
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL,  -- 'task', 'subsystem', 'pilot', etc.
  entity_id UUID NOT NULL,
  author TEXT NOT NULL DEFAULT 'Jero',
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  organization_id UUID REFERENCES organizations(id)
);
CREATE INDEX idx_comments_entity ON comments(entity_type, entity_id);

-- Add columns to existing tables if missing
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS criticality TEXT DEFAULT 'medium';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS owner TEXT DEFAULT 'Jero';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

ALTER TABLE subsystems ADD COLUMN IF NOT EXISTS criticality TEXT DEFAULT 'medium';
ALTER TABLE subsystems ADD COLUMN IF NOT EXISTS owner TEXT DEFAULT 'Jero';
ALTER TABLE subsystems ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
```

---

## Phase 2: Monday-like Board (Day 2)

### NodeBoard component
Each node renders as a table with:
- **Headers** from `columns` in NodeConfig
- **Rows** from Supabase query
- **Inline editing** — Click any cell to edit
- **Criticality column** — Color-coded badge (red/amber/blue/gray)
- **Progress column** — Animated bar with percentage
- **Owner column** — Avatar + name
- **Actions** — Add row, delete, expand detail
- **Comment count** — Badge showing # comments per row

### TaskDetail panel
When clicking a row, expands to show:
- Full description (editable textarea)
- Comment thread (add/view comments)
- Criticality selector (dropdown)
- Owner assignment
- Due date picker
- Tags editor
- Activity log
- Agent mutation history

---

## Phase 3: Settings & Top Bar (Day 3)

### TopBar redesign
```
[DOGMA logo] [Search...] [Node breadcrumb]     [🤖 Coder ▾] [⚙️ Settings] [Jero · Admin]
```
- Remove duplicate "admin" labels
- Single user pill at far right
- Settings gear icon opens SettingsPanel
- Agent selector dropdown in top bar

### SettingsPanel
- **Account**: Name, role (admin/operator/viewer), email
- **Permissions**: Which agents can auto-execute vs need approval
- **Agent Policy**: Direct edit / Approval required / Read-only
- **Connections**: MCP integrations status
- **API Keys**: Manage ANTHROPIC_API_KEY
- **OpenClaw**: Gateway config, token, workspace path

---

## Phase 4: Agent Integration (Day 4)

### Agent data editing
Agents see ALL node data in their system prompt:
```
--- DOGMA CONTEXT ---
Subsystems: Hand Mechanism(78%), Actuators(65%), Sensing(38%)...
Tasks: [critical] ISO compliance, [high] Wrist assembly...
Pilots: TechMfg(Discovery, 72%), AutoParts(PoC, 85%)...
Finance: burn $12.5K/mo, runway 3.6mo
```

When agent wants to edit, it returns mutations:
```json
{
  "mutations": [
    { "type": "update", "table": "tasks", "id": "xxx", "fields": { "progress": 75, "status": "in_progress" } },
    { "type": "insert", "table": "comments", "fields": { "entity_type": "task", "entity_id": "xxx", "text": "Updated progress after review" } }
  ]
}
```

Settings.agentEditPolicy determines:
- `direct`: Mutations apply immediately
- `approval`: Mutations go to approval queue
- `readonly`: Mutations rejected

### Manual editing
Every cell in NodeBoard is clickable:
- Text → input field
- Number → number input
- Progress → slider
- Status → dropdown
- Priority → dropdown with colors
- Person → dropdown of team members
- Date → date picker
- Tags → tag editor with autocomplete

Changes save to Supabase on blur/enter.

---

## Phase 5: Polish (Day 5)

- Comment counts on sidebar nodes
- Notification badges
- Keyboard shortcuts (Cmd+K search, Esc close)
- Export node data as CSV
- Node detail page with chart/graph view
- Mobile responsive adjustments

---

## How to build this

**Option A: Claude Code** (recommended)
```bash
cd ~/dogma-os
claude "Read ARCHITECTURE.md and implement Phase 1. Create all component files. Keep the existing Supabase schema and add the comments table."
```

**Option B: Incremental with Claude chat**
Ask me to build one component at a time:
1. "Build NodeBoard.tsx"
2. "Build TopBar.tsx"
3. "Build SettingsPanel.tsx"
etc.

**Option C: Full rebuild**
Start a new Next.js project and build from scratch following this architecture.

---

## Key files already working (keep)
- `src/lib/agents.ts` — 11 agents ✅
- `src/lib/auth.ts` — Session/permissions ✅
- `src/hooks/useOpenClaw.ts` — Gateway hook ✅
- `src/app/api/chat/route.ts` — OpenClaw proxy ✅
- `next.config.ts` — Rewrites ✅
- `.env.local` — API keys ✅
- `vercel.json` — Deploy config ✅
