-- ══════════════════════════════════════════════════════════════════
-- DOGMA OS — Full Schema Migration
-- Run this in Supabase SQL Editor (supabase.com → SQL → New query)
-- ══════════════════════════════════════════════════════════════════

-- ════════════════════════════════════
-- 1. IDENTITY & ACCESS
-- ════════════════════════════════════

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free', -- free, pro, enterprise
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS organization_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'engineer', -- founder_admin, ops_admin, engineer, finance, advisor_readonly, contractor_limited
  status TEXT DEFAULT 'active', -- active, invited, suspended
  joined_at TIMESTAMPTZ DEFAULT now(),
  invited_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

-- ════════════════════════════════════
-- 2. SERVICE CONNECTIONS & OAUTH
-- ════════════════════════════════════

CREATE TABLE IF NOT EXISTS service_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  service TEXT NOT NULL, -- google, github, slack, figma, etc.
  external_account_email TEXT,
  status TEXT DEFAULT 'active', -- active, expired, revoked
  scopes TEXT,
  connected_at TIMESTAMPTZ DEFAULT now(),
  last_validated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, user_id, service)
);

CREATE TABLE IF NOT EXISTS oauth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  service_connection_id UUID REFERENCES service_connections(id) ON DELETE CASCADE,
  access_token_encrypted TEXT NOT NULL,
  refresh_token_encrypted TEXT,
  expires_at TIMESTAMPTZ,
  scopes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ════════════════════════════════════
-- 3. BUSINESS DOMAIN TABLES
-- ════════════════════════════════════

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT, -- product, pilot, research, infrastructure
  status TEXT DEFAULT 'active', -- active, paused, completed, archived
  owner_user_id UUID REFERENCES users(id),
  summary TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subsystems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  category TEXT, -- mechanical, electrical, software, control, sensor
  maturity_level INTEGER DEFAULT 0, -- 0-100
  status TEXT DEFAULT 'dev', -- dev, testing, iterating, validated, production
  version TEXT,
  owner_user_id UUID REFERENCES users(id),
  details JSONB DEFAULT '[]', -- array of detail strings
  risks JSONB DEFAULT '[]', -- array of risk strings  
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  success_rate INTEGER DEFAULT 0, -- 0-100
  status TEXT DEFAULT 'dev',
  tests_count INTEGER DEFAULT 0,
  protocol TEXT,
  gaps JSONB DEFAULT '[]',
  last_test_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo', -- todo, progress, blocked, done
  priority TEXT DEFAULT 'medium', -- low, medium, high, critical
  workspace TEXT, -- R&D, Fund, Safety, Builds, Pilots, Skills, Fleet
  assignee_user_id UUID REFERENCES users(id),
  created_by UUID REFERENCES users(id),
  due_at TIMESTAMPTZ,
  blocked_by TEXT,
  sub_tasks JSONB DEFAULT '[]',
  impact TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pilots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  stage TEXT DEFAULT 'Identified', -- Identified, Auto Score, Manual Score, Line Analysis, Site Visit, Proposal Sent, Negotiation, Signed
  viability_score INTEGER DEFAULT 0,
  roi_estimate TEXT,
  champion_name TEXT,
  champion_strength TEXT, -- None, Weak, Medium, Strong
  plant_location TEXT,
  plc_system TEXT,
  pain_description TEXT,
  required_skills JSONB DEFAULT '[]',
  compliance_reqs JSONB DEFAULT '[]',
  risk_level TEXT DEFAULT 'medium',
  open_questions JSONB DEFAULT '[]',
  next_step TEXT,
  follow_up_date TIMESTAMPTZ,
  blockers JSONB DEFAULT '[]',
  meetings JSONB DEFAULT '[]',
  owner_user_id UUID REFERENCES users(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  fund_name TEXT NOT NULL,
  stage TEXT DEFAULT 'Researched', -- Researched, Cold, Warm Intro, 1st Meeting, DD, Term Sheet, Closed
  probability INTEGER DEFAULT 0,
  check_size TEXT,
  thesis TEXT,
  objections JSONB DEFAULT '[]',
  touchpoints JSONB DEFAULT '[]',
  next_action TEXT,
  next_date TIMESTAMPTZ,
  owner_user_id UUID REFERENCES users(id),
  last_contact_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  severity TEXT DEFAULT 'low', -- low, medium, high, critical
  status TEXT DEFAULT 'open', -- open, investigating, resolved
  description TEXT,
  root_cause TEXT,
  downtime TEXT,
  affected_systems JSONB DEFAULT '[]',
  actions JSONB DEFAULT '[]',
  timeline JSONB DEFAULT '[]',
  owner_user_id UUID REFERENCES users(id),
  reported_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fleet (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  unit_name TEXT NOT NULL,
  unit_type TEXT,
  status TEXT DEFAULT 'active', -- active, maintenance, build, retired
  hours INTEGER DEFAULT 0,
  health INTEGER DEFAULT 100,
  location TEXT,
  config TEXT,
  systems JSONB DEFAULT '[]',
  last_maintenance TIMESTAMPTZ,
  next_maintenance TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  target_date TIMESTAMPTZ,
  progress INTEGER DEFAULT 0, -- 0-100
  risk_level TEXT DEFAULT 'low',
  blockers JSONB DEFAULT '[]',
  criteria JSONB DEFAULT '[]', -- completion criteria
  dependencies JSONB DEFAULT '[]', -- IDs of dependent entities
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS safety_standards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  coverage INTEGER DEFAULT 0, -- 0-100
  gaps JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  outcome TEXT, -- pass, fail, partial
  confidence INTEGER DEFAULT 0,
  date TIMESTAMPTZ,
  parameters JSONB DEFAULT '[]',
  conclusion TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ════════════════════════════════════
-- 4. NOTES (unified, replaces embedded notes)
-- ════════════════════════════════════

CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL, -- subsystem, task, pilot, investor, incident, experiment, fleet, milestone
  entity_id UUID NOT NULL,
  author_user_id UUID REFERENCES users(id),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notes_entity ON notes(entity_type, entity_id);

-- ════════════════════════════════════
-- 5. ARTIFACTS (replaces public/generated)
-- ════════════════════════════════════

CREATE TABLE IF NOT EXISTS artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  created_by_user_id UUID REFERENCES users(id),
  source_type TEXT, -- agent_chat, agent_swarm, manual, import
  source_id TEXT, -- agent run ID or reference
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  storage_visibility TEXT DEFAULT 'internal', -- public, internal, restricted
  mime_type TEXT,
  size_bytes INTEGER,
  checksum TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ════════════════════════════════════
-- 6. ACTIVITY & AUDIT
-- ════════════════════════════════════

-- Activity log (operational)
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  actor_user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_org ON activity_log(organization_id, created_at DESC);

-- Audit events (security/compliance)
CREATE TABLE IF NOT EXISTS audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  actor_user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  before_json JSONB,
  after_json JSONB,
  policy_decision TEXT, -- allowed, denied, escalated
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_org ON audit_events(organization_id, created_at DESC);

-- ════════════════════════════════════
-- 7. AGENT RUNS (tracks every agent execution)
-- ════════════════════════════════════

CREATE TABLE IF NOT EXISTS agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  agent_id TEXT NOT NULL,
  mode TEXT DEFAULT 'chat', -- chat, swarm
  workflow_id TEXT,
  objective TEXT,
  tools_used JSONB DEFAULT '[]',
  files_generated JSONB DEFAULT '[]',
  mutations_proposed JSONB DEFAULT '[]',
  mutations_applied JSONB DEFAULT '[]',
  token_usage JSONB DEFAULT '{}',
  duration_ms INTEGER,
  status TEXT DEFAULT 'completed', -- running, completed, failed, cancelled
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agent_runs_org ON agent_runs(organization_id, created_at DESC);

-- ════════════════════════════════════
-- 8. FINANCE (structured, replaces fin blob)
-- ════════════════════════════════════

CREATE TABLE IF NOT EXISTS finance_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  month TEXT NOT NULL, -- YYYY-MM
  burn_rate INTEGER DEFAULT 0,
  cash_on_hand INTEGER DEFAULT 0,
  runway_months NUMERIC(4,1) DEFAULT 0,
  bom_cost INTEGER DEFAULT 0,
  spend_breakdown JSONB DEFAULT '[]', -- [{category, amount}]
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, month)
);

CREATE TABLE IF NOT EXISTS supply_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  supplier TEXT,
  lead_time TEXT,
  risk_level TEXT DEFAULT 'low',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ════════════════════════════════════
-- 9. PERMISSIONS TABLE
-- ════════════════════════════════════

CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  permission TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(role, permission)
);

-- Seed default permissions
INSERT INTO role_permissions (role, permission) VALUES
  -- founder_admin: everything
  ('founder_admin', 'read:*'), ('founder_admin', 'write:*'), ('founder_admin', 'manage:*'), ('founder_admin', 'agent:*'),
  -- ops_admin
  ('ops_admin', 'read:projects'), ('ops_admin', 'read:tasks'), ('ops_admin', 'read:pilots'), ('ops_admin', 'read:incidents'),
  ('ops_admin', 'read:subsystems'), ('ops_admin', 'read:artifacts'), ('ops_admin', 'read:connections'),
  ('ops_admin', 'write:tasks'), ('ops_admin', 'write:pilots'), ('ops_admin', 'write:incidents'), ('ops_admin', 'write:notes'),
  ('ops_admin', 'agent:chat.basic'), ('ops_admin', 'agent:chat.mutate'), ('ops_admin', 'agent:swarm.basic'),
  -- engineer
  ('engineer', 'read:projects'), ('engineer', 'read:tasks'), ('engineer', 'read:subsystems'), ('engineer', 'read:incidents'),
  ('engineer', 'read:artifacts'),
  ('engineer', 'write:tasks'), ('engineer', 'write:subsystems'), ('engineer', 'write:notes'),
  ('engineer', 'agent:chat.basic'),
  -- finance
  ('finance', 'read:projects'), ('finance', 'read:investors'), ('finance', 'read:pilots'), ('finance', 'read:artifacts'),
  ('finance', 'write:notes'),
  ('finance', 'agent:chat.basic'),
  -- advisor_readonly
  ('advisor_readonly', 'read:projects'), ('advisor_readonly', 'read:tasks'), ('advisor_readonly', 'read:pilots'),
  -- contractor_limited
  ('contractor_limited', 'read:tasks'), ('contractor_limited', 'write:tasks')
ON CONFLICT (role, permission) DO NOTHING;

-- ════════════════════════════════════
-- 10. SEED DATA — Create initial org + user
-- ════════════════════════════════════

-- Create DOGMA org
INSERT INTO organizations (id, name, slug, plan) VALUES
  ('00000000-0000-0000-0000-000000000001', 'DOGMA Robotics', 'dogma', 'pro')
ON CONFLICT (slug) DO NOTHING;

-- Create Jero user (will be linked to real auth later)
INSERT INTO users (id, email, name) VALUES
  ('00000000-0000-0000-0000-000000000002', 'jero@dogmarobotics.com', 'Jeronimo Ortiz')
ON CONFLICT (email) DO NOTHING;

-- Link Jero as founder_admin
INSERT INTO organization_memberships (organization_id, user_id, role, status) VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'founder_admin', 'active')
ON CONFLICT (organization_id, user_id) DO NOTHING;

-- ════════════════════════════════════
-- 11. ROW LEVEL SECURITY (basic)
-- ════════════════════════════════════

-- Enable RLS on all domain tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilots ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE subsystems ENABLE ROW LEVEL SECURITY;
ALTER TABLE fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;

-- For now, service role key bypasses RLS (used by API routes)
-- When you add Supabase Auth, add proper policies per-user

-- ════════════════════════════════════
-- 12. HELPFUL VIEWS
-- ════════════════════════════════════

CREATE OR REPLACE VIEW dashboard_summary AS
SELECT
  o.id AS organization_id,
  o.name AS org_name,
  (SELECT count(*) FROM tasks t WHERE t.organization_id = o.id AND t.status != 'done') AS open_tasks,
  (SELECT count(*) FROM tasks t WHERE t.organization_id = o.id AND t.priority = 'critical' AND t.status != 'done') AS critical_tasks,
  (SELECT count(*) FROM incidents i WHERE i.organization_id = o.id AND i.status != 'resolved') AS open_incidents,
  (SELECT count(*) FROM pilots p WHERE p.organization_id = o.id) AS total_pilots,
  (SELECT count(*) FROM investors inv WHERE inv.organization_id = o.id) AS total_investors,
  (SELECT avg(s.maturity_level) FROM subsystems s WHERE s.organization_id = o.id)::integer AS avg_maturity,
  (SELECT f.runway_months FROM finance_snapshots f WHERE f.organization_id = o.id ORDER BY f.month DESC LIMIT 1) AS runway_months,
  (SELECT f.burn_rate FROM finance_snapshots f WHERE f.organization_id = o.id ORDER BY f.month DESC LIMIT 1) AS burn_rate,
  (SELECT f.cash_on_hand FROM finance_snapshots f WHERE f.organization_id = o.id ORDER BY f.month DESC LIMIT 1) AS cash_on_hand
FROM organizations o;
