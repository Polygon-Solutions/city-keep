CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state_province VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL
);

CREATE TABLE categories (
  id INT PRIMARY KEY NOT NULL,
  label VARCHAR(30) NOT NULL
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users (id) NOT NULL,
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

INSERT INTO users (last_name, first_name, email, password, city, state_province, country) VALUES ('Last', 'First', 'test@test.com', 'test', 'Vancouver', 'BC', 'Canada');

INSERT INTO categories (id, label) VALUES (1, 'Drainage/Flooding');
INSERT INTO categories (id, label) VALUES (2, 'Graffiti/Vandalism');
INSERT INTO categories (id, label) VALUES (3, 'Litter Pickup');
INSERT INTO categories (id, label) VALUES (4, 'Parks - General');
INSERT INTO categories (id, label) VALUES (5, 'Potholes');
INSERT INTO categories (id, label) VALUES (6, 'Sidewalks');
INSERT INTO categories (id, label) VALUES (7, 'Signs');
INSERT INTO categories (id, label) VALUES (8, 'Snow/Ice');
INSERT INTO categories (id, label) VALUES (9, 'Streetlights');
INSERT INTO categories (id, label) VALUES (10, 'Streets - General');
INSERT INTO categories (id, label) VALUES (11, 'Trails/Walkways');
INSERT INTO categories (id, label) VALUES (12, 'Trees');
INSERT INTO categories (id, label) VALUES (13, 'Utilities/Infrastructure');
INSERT INTO categories (id, label) VALUES (14, 'Other');

INSERT INTO reports (user_id, category_id, description, report_time, address, longitude, latitude) VALUES (1, 7, 'Test report 1. Category selected as "Signs".', '2003-04-12 04:05:06 PST', '0000 W Georgia St., Vancouver, BC, V0V 0V0', 100.100000, 30.300000);
INSERT INTO reports (user_id, category_id, description, report_time, address, longitude, latitude) VALUES (1, 12, 'Test report 2. Category selected as "Trees".', '2003-04-12 04:05:07 PST', '0000 W Georgia St., Vancouver, BC, V0V 0V0', 100.100000, 30.300000);
INSERT INTO reports (user_id, category_id, description, report_time, address, longitude, latitude) VALUES (1, 14, 'Test report 3. Category selected as "Other".', '2003-04-12 04:05:08 PST', '0000 W Georgia St., Vancouver, BC, V0V 0V0', 100.100000, 30.300000);

INSERT INTO images (report_id, image_url) VALUES (1, 'https://media-exp1.licdn.com/dms/image/C4D1BAQFFA6qBq7hHzg/company-background_10000/0/1622840496876?e=2159024400&v=beta&t=SDuw0kCp0yklzQhJkbARi0BkV8IcOxVVBwxGKOM3lD4');
INSERT INTO images (report_id, image_url) VALUES (2, 'https://lp-cms-production.imgix.net/2021-04/GettyRF_612004360.jpg');
INSERT INTO images (report_id, image_url) VALUES (3, 'https://tricycle.org/wp-content/uploads/2019/04/buddhism-in-vancouver.jpg');