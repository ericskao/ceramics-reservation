CREATE TABLE users(
  id varchar(40) PRIMARY KEY,
  name varchar(40),
  email varchar(40),
  is_verified boolean DEFAULT FALSE NOT NULL,
  is_admin boolean DEFAULT FALSE NOT NULL
);

CREATE TABLE reservations(
  id serial PRIMARY KEY,
  user_id varchar(40) REFERENCES users(id),
  date date,
  starting_time int,
  wheel_number int
);

