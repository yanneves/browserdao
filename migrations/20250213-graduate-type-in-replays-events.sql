-- Step 1: Create the ENUM type
CREATE TYPE replays_events_type AS ENUM ('agent', 'prompt', 'render');
--
-- Step 2: Alter the `type` column to use the ENUM
ALTER TABLE replays_events
ALTER COLUMN type
SET DATA TYPE replays_events_type USING type::replays_events_type;
--
-- Step 3: Populate `type` column from `payload`
UPDATE replays_events
SET type = payload->>'type'::replays_events_type;
--
-- Step 4: Remove `type` field from `payload`
UPDATE replays_events
SET payload = CASE
    -- If payload->'payload' is an object, extract it as JSONB
    WHEN jsonb_typeof(payload->'payload') = 'object' THEN (payload->'payload')::jsonb -- If payload->'payload' is a string, wrap it in an object under "data"
    WHEN jsonb_typeof(payload->'payload') = 'string' THEN jsonb_build_object('data', payload->>'payload') -- Otherwise, leave payload unchanged
    ELSE payload
  END;
--
-- Step 5: Ensure `type` column is NOT NULL
ALTER TABLE replays_events
ALTER COLUMN type
SET NOT NULL;