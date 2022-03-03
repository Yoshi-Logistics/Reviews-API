DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;

DROP TABLE IF EXISTS reviews, reviews_photos, characteristics, characteristic_reviews;

CREATE TABLE reviews (
 id BIGSERIAL PRIMARY KEY,
 product_id INTEGER,
 rating INTEGER NOT NULL,
 date VARCHAR(30) NOT NULL,
 summary VARCHAR(60) NOT NULL,
 body VARCHAR(1000) NOT NULL,
 recommend INTEGER NOT NULL,
 reported INTEGER NOT NULL,
 reviewer_name VARCHAR(60) NOT NULL,
 reviewer_email VARCHAR(60) NOT NULL,
 response VARCHAR(1000) NOT NULL,
 helpfulness INTEGER NOT NULL
);

CREATE TABLE reviews_photos (
 id BIGSERIAL PRIMARY KEY,
 review_id INTEGER NOT NULL,
 url VARCHAR(200)
);

CREATE TABLE characteristics (
 id BIGSERIAL PRIMARY KEY,
 product_id INTEGER NOT NULL,
 name VARCHAR(60) NOT NULL
);

CREATE TABLE characteristic_reviews (
  id BIGSERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value VARCHAR(20) NOT NULL
);
