CREATE TABLE users(
  id serial PRIMARY KEY,
  name varchar(40),
  email varchar(40)
);

CREATE TABLE reservations(
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id),
  date date,
  time_slot varchar(20)
);

