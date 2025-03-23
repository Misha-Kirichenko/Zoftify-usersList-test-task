DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_enum') THEN
        CREATE TYPE role_enum AS ENUM ('admin', 'user');
    END IF;
END $$;


CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY, 
    "firstName" VARCHAR NOT NULL, 
    "lastName" VARCHAR NOT NULL, 
    "email" VARCHAR NOT NULL, 
    "password" VARCHAR NOT NULL, 
    "lastLogin" INTEGER NOT NULL DEFAULT 0, 
    "role" "role_enum" NOT NULL DEFAULT 'user'
);


CREATE UNIQUE INDEX IF NOT EXISTS "IDX_user_email" ON "users" ("email");
