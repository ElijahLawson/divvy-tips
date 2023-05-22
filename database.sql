
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (80) NOT NULL,
    "last_name" VARCHAR (80) NOT NULL,
    "location_id" INTEGER REFERENCES location
);

CREATE TABLE "location" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL,
    "city" VARCHAR (100) NOT NULL,
    "state" VARCHAR (64) NOT NULL
);

CREATE TABLE shift_tips (
    "id" SERIAL PRIMARY KEY,
    "time_in" TIMESTAMP,
    "time_out" TIMESTAMP,
    "hours_worked" DECIMAL,
    "total_tips" MONEY,
    "employee_id" INTEGER REFERENCES user,
    "shift_id" INTEGER REFERENCES shift_tips
);

CREATE TABLE shifts (
    "id" SERIAL PRIMARY KEY,
    "date" date,
    "hourly" MONEY,
    "total_hours" DECIMAL,
    "runner_id" INTEGER REFERENCES user
);

INSERT INTO location ("name", "city", "state")
VALUES ('Tin Roof Fayetteville', 'Fayetteville', 'AR');

INSERT INTO "user" (username, password, first_name, last_name, location_id)
VALUES ('ElijahLawson', '')