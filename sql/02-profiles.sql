BEGIN
;

-- TODO: on new user entry create empty?
CREATE TABLE IF NOT EXISTS profiles (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4 (),
    -- main
    "userId" UUID NOT NULL,
    "username" TEXT NOT NULL,
    -- optional
    "firstName" TEXT,
    "lastName" TEXT,
    -- dates
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NULL,
    PRIMARY KEY ("id"),
    UNIQUE("userId", "username"),
    FOREIGN KEY ("userId") REFERENCES users ("id") ON
    DELETE
        CASCADE
);

CREATE INDEX IF NOT EXISTS "profiles_userId_index" ON profiles ("userId");

create index IF NOT EXISTS "profiles_username_index" ON profiles ("username");

CREATE
OR REPLACE TRIGGER update_profiles_updatedAt BEFORE
UPDATE
    ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updatedAt ();

END;

COMMIT;