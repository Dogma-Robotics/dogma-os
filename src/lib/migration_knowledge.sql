-- Knowledge nodes tree (dynamic sidebar nodes)
CREATE TABLE IF NOT EXISTS knowledge_nodes (
  id TEXT PRIMARY KEY,
  parent_id TEXT,
  label TEXT NOT NULL,
  icon TEXT DEFAULT '📄',
  description TEXT DEFAULT '',
  db_table TEXT DEFAULT 'subsystems',
  level INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_kn_parent ON knowledge_nodes(parent_id);

-- Node rows (data inside each knowledge node board)
CREATE TABLE IF NOT EXISTS node_rows (
  id TEXT PRIMARY KEY,
  node_id TEXT NOT NULL REFERENCES knowledge_nodes(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_nr_node ON node_rows(node_id);
