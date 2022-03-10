DROP DATABASE IF EXISTS reviewsdb;
CREATE DATABASE reviewsdb;

\c reviewsdb;

DROP TABLE IF EXISTS reviews, photos, characteristics, characteristic_reviews;

CREATE TABLE reviews (
 id BIGSERIAL PRIMARY KEY,
 product_id INTEGER,
 rating INTEGER NOT NULL,
 date BIGINT NOT NULL,
 summary VARCHAR(250) NOT NULL,
 body VARCHAR(1000) NOT NULL,
 recommend BOOLEAN NOT NULL,
 reported BOOLEAN NOT NULL,
 reviewer_name VARCHAR(60) NOT NULL,
 reviewer_email VARCHAR(75) NOT NULL,
 response VARCHAR(1000),
 helpfulness INTEGER NOT NULL
);

CREATE TABLE photos (
 id BIGSERIAL PRIMARY KEY,
 review_id INTEGER NOT NULL,
 url VARCHAR,
 FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
 id BIGSERIAL PRIMARY KEY,
 product_id INTEGER NOT NULL,
 name VARCHAR(75) NOT NULL
);

CREATE TABLE characteristic_reviews (
  id BIGSERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value VARCHAR(50) NOT NULL,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE INDEX reviews_id_idx ON reviews (id);

COPY reviews FROM '/Users/jinicha/Desktop/seip2201/sdc/csv/reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/jinicha/Desktop/seip2201/sdc/csv/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/jinicha/Desktop/seip2201/sdc/csv/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY characteristic_reviews FROM '/Users/jinicha/Desktop/seip2201/sdc/csv/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

SELECT setval(pg_get_serial_sequence('reviews', 'id'), coalesce(max(id), 0)+1 , false) FROM reviews;
SELECT setval(pg_get_serial_sequence('photos', 'id'), coalesce(max(id), 0)+1 , false) FROM photos;
SELECT setval(pg_get_serial_sequence('characteristics', 'id'), coalesce(max(id), 0)+1 , false) FROM characteristics;
SELECT setval(pg_get_serial_sequence('characteristic_reviews', 'id'), coalesce(max(id), 0)+1 , false) FROM characteristic_reviews;

