CREATE TABLE accounts (
  id UUID PRIMARY KEY,
  balance INTEGER NOT NULL
);

CREATE TABLE invites (
  id TEXT PRIMARY KEY,
  account UUID,
  CONSTRAINT fk_account FOREIGN KEY (account) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE replays (
  id UUID PRIMARY KEY,
  account UUID NOT NULL,
  prompt TEXT NOT NULL,
  url TEXT NOT NULL CHECK (url ~* '^https://'),
  CONSTRAINT fk_account FOREIGN KEY (account) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE replays_events (
  id UUID PRIMARY KEY,
  replay UUID NOT NULL,
  payload JSON NOT NULL,
  CONSTRAINT fk_replay FOREIGN KEY (replay) REFERENCES replays(id) ON DELETE CASCADE
);
