-- Add progress column to tasks (run after 001_full_schema.sql)
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0;
-- 0-100 percentage completion
