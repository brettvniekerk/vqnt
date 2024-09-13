BEGIN
;

CREATE TABLE IF NOT EXISTS users (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4 (),
  -- main
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  -- dates
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NULL,
  PRIMARY KEY ("id"),
  UNIQUE("email")
);

CREATE INDEX IF NOT EXISTS "users_email_index" ON users ("email");

CREATE
OR REPLACE TRIGGER update_users_updatedAt BEFORE
UPDATE
  ON users FOR EACH ROW EXECUTE PROCEDURE update_updatedAt ();

END;

COMMIT;