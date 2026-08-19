CREATE TABLE IF NOT EXISTS visitors (
  visitor_hash TEXT PRIMARY KEY,
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors(last_seen);
