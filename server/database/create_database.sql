CREATE TABLE users (
  id VARCHAR(128) PRIMARY KEY NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE categories (
  id INT PRIMARY KEY NOT NULL,
  label VARCHAR(50) NOT NULL
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(128) REFERENCES users (id) NOT NULL,
  category_id INT REFERENCES categories (id) NOT NULL,
  description TEXT NOT NULL,
  report_time TIMESTAMP(0) WITH TIME ZONE NOT NULL,
  address VARCHAR(255) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  latitude DECIMAL(8,6) NOT NULL,
  UNIQUE (user_id, report_time)
);

CREATE TABLE images (
  report_id INT REFERENCES reports (id) NOT NULL,
  image_url text NOT NULL,
  UNIQUE (report_id, image_url)
);
