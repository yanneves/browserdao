-- Step 1: Add `archived_at` column to replays
ALTER TABLE replays
ADD COLUMN archived_at TIMESTAMP NULL;