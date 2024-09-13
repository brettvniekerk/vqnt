BEGIN
;

-- password is "password" encrypted
INSERT INTO
  users ("id", "email", "password")
VALUES
  (
    'ff20e786-2b07-4443-8c72-d603edf30ffc',
    'userone@email.com',
    '$2b$10$d9M4122rw/eMWjp7rn8x3OrOb.QuYAifa5BzgApqSVXvc2/uZAHU.'
  );

END;

COMMIT;