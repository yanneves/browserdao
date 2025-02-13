-- Create the accounts table to store user accounts
CREATE TABLE accounts (
  id UUID PRIMARY KEY,
  -- Unique identifier for each account
  balance INTEGER NOT NULL -- Balance field, must always have a value
);
--
-- Create the invites table for storing invite codes
CREATE TABLE invites (
  id TEXT PRIMARY KEY,
  -- Unique invite code (human-readable)
  account UUID,
  -- Optional link to an account, can be NULL initially
  CONSTRAINT fk_account FOREIGN KEY (account) REFERENCES accounts(id) ON DELETE CASCADE -- Foreign key ensures an invite can only reference an existing account
  -- If the linked account is deleted, the invite is also removed
);
--
-- Create the replays table to store saved replays (e.g., user actions)
CREATE TABLE replays (
  id UUID PRIMARY KEY,
  -- Unique replay identifier
  account UUID NOT NULL,
  -- Link to the account that owns the replay
  prompt TEXT NOT NULL,
  -- Required text prompt associated with the replay
  url TEXT NOT NULL CHECK (url ~* '^https://'),
  -- URL must be HTTPS for security reasons (case-insensitive regex match)
  CONSTRAINT fk_account FOREIGN KEY (account) REFERENCES accounts(id) ON DELETE CASCADE -- If an account is deleted, all its replays are also deleted
);
--
-- Create the replays_events table to store events related to a replay
CREATE TABLE replays_events (
  id UUID PRIMARY KEY,
  -- Unique event identifier
  replay UUID NOT NULL,
  -- Links to the replay this event belongs to
  payload JSON NOT NULL,
  -- Stores event data in JSON format
  CONSTRAINT fk_replay FOREIGN KEY (replay) REFERENCES replays(id) ON DELETE CASCADE -- If a replay is deleted, all its events are also deleted
);