BEGIN
;

CREATE TABLE IF NOT EXISTS temp (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4 (),
  -- main
  "field" TEXT,
  "value" NUMERIC,
  -- dates
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NULL,
  PRIMARY KEY ("id")
);

CREATE
OR REPLACE TRIGGER update_temp_updatedAt BEFORE
UPDATE
  ON temp FOR EACH ROW EXECUTE PROCEDURE update_updatedAt ();

END;

COMMIT;