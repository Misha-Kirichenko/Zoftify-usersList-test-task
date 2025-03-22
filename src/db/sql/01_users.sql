CREATE TYPE "role_enum" AS ENUM('user', 'admin');

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY, 
    "firstName" VARCHAR NOT NULL, 
    "lastName" VARCHAR NOT NULL, 
    "email" VARCHAR NOT NULL, 
    "password" VARCHAR NOT NULL, 
    "lastLogin" INTEGER NOT NULL DEFAULT 0, 
    "role" "role_enum" NOT NULL DEFAULT 'user'
);


CREATE UNIQUE INDEX "IDX_user_email" ON "users" ("email");
