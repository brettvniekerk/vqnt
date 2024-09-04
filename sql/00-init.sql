BEGIN
;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE
OR REPLACE FUNCTION update_updatedAt() RETURNS TRIGGER AS $$ BEGIN
  NEW."updatedAt" = NOW();

RETURN NEW;

END;

$$ LANGUAGE "plpgsql" SECURITY DEFINER
SET
  search_path = PUBLIC,
  pg_temp;

END;

COMMIT;