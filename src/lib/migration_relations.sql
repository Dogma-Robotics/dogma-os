-- Node relations (graph edges)
CREATE TABLE IF NOT EXISTS node_relations (
  id TEXT PRIMARY KEY DEFAULT 'rel_' || extract(epoch from now())::text,
  source_id TEXT NOT NULL,
  target_id TEXT NOT NULL,
  relation_type TEXT NOT NULL,
  label TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_rel_source ON node_relations(source_id);
CREATE INDEX IF NOT EXISTS idx_rel_target ON node_relations(target_id);

-- Activity log
CREATE TABLE IF NOT EXISTS activity_log (
  id TEXT PRIMARY KEY DEFAULT 'act_' || extract(epoch from now())::text,
  event_type TEXT NOT NULL,
  node_id TEXT,
  node_label TEXT,
  user_name TEXT DEFAULT 'Jero',
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_activity_time ON activity_log(created_at DESC);

-- Automation rules
CREATE TABLE IF NOT EXISTS automation_rules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  trigger_config JSONB NOT NULL,
  condition_config JSONB,
  action_config JSONB NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
