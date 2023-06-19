/** 
 * *
 * Populate Database PostgreSQL Script
 * @description 
    - Populates mock database for development and testing purposes
 * @listens database.sh
 */

INSERT INTO users (id, last_name, first_name, email) VALUES ('58f4ea2a-d62f-4d2b-9126-e6fed97323b9', 'Anonymous', 'Demo', 'demo@anonymous.com');

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

INSERT INTO reports (user_id, title, category_id, description, report_time, address) VALUES ('58f4ea2a-d62f-4d2b-9126-e6fed97323b9', 'Garbage Bags on Street', 3, 'There are some garbage bags on the street outside the W Georgia St. entrance of my building. I''m worried that they will cause an accident.', '2022-12-10 10:23:54-07', '1450 W Georgia St, Vancouver, BC V6G 2T8, Canada');
INSERT INTO reports (user_id, title, category_id, description, report_time, address) VALUES ('58f4ea2a-d62f-4d2b-9126-e6fed97323b9', 'Large Potholes on Todd Rd.', 5, 'There are some large potholes on Todd Rd. between Dallas and Barnhartvale. There are so many that it has become dangerous to avoid them.', '2022-12-11 10:23:54-07', '1408 Todd Rd., Kamloops, BC V2C 5B5, Canada');
INSERT INTO reports (user_id, title, category_id, description, report_time, address) VALUES ('58f4ea2a-d62f-4d2b-9126-e6fed97323b9', 'Streetlight is Flickering', 9, 'The streetlight is flickering on rue Simons. It makes the street feel like a techno club.', '2022-12-12 23:46:43+01', '14 Rue Simon, Reims, Grand Est 51100, France');
