CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(20) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    password varchar(120) NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    active boolean DEFAULT true NOT NULL
);
