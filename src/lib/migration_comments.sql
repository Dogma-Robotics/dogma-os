-- Comments table (works for any entity)
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  author TEXT NOT NULL DEFAULT 'Jero',
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  organization_id UUID REFERENCES organizations(id)
);
CREATE INDEX IF NOT EXISTS idx_comments_entity ON comments(entity_type, entity_id);

-- Add columns to existing tables if missing
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS criticality TEXT DEFAULT 'medium';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS owner TEXT DEFAULT 'Jero';
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

ALTER TABLE subsystems ADD COLUMN IF NOT EXISTS criticality TEXT DEFAULT 'medium';
ALTER TABLE subsystems ADD COLUMN IF NOT EXISTS owner TEXT DEFAULT 'Jero';
ALTER TABLE subsystems ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
