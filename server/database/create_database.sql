/** 
 * *
 * Create Database PostgreSQL Script
 * @description 
    - Creates mock database for development and testing purposes
 * @listens database.sh
 */

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
  title VARCHAR(255) NOT NULL,
  category_id INT REFERENCES categories (id) NOT NULL,
  description TEXT NOT NULL,
  report_time TIMESTAMP(0) WITH TIME ZONE NOT NULL,
  address VARCHAR(255) NOT NULL,
  longitude DECIMAL(9,6),
  latitude DECIMAL(8,6),
  UNIQUE (user_id, report_time)
);
