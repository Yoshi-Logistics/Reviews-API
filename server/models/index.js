const { pool } = require('../../db');

module.exports = {
  getReviews: (page, count, sort, productId, cb) => {
    const query = {
      text: `SELECT json_build_object
      (
        'product', ${productId},
        'page', ${page},
        'count', ${count},
        'results',
        (
          SELECT json_agg
          (
            json_build_object
            (
              'review_id', reviews.id,
              'rating', reviews.rating,
              'summary', reviews.summary,
              'recommend', reviews.recommend,
              'response', reviews.response,
              'body', reviews.body,
              'date', reviews.date,
              'reviewer_name', reviews.reviewer_name,
              'helpfulness', reviews.helpfulness,
              'photos',
              (
                SELECT json_agg
                (
                  json_build_object
                  (
                  'id', photos.id,
                  'url', photos.url
                  )
                )
                FROM photos
                WHERE photos.review_id = reviews.id
              )
            )
          )
          FROM reviews
          WHERE reviews.product_id=$1 AND reviews.reported=false
        )
      )`,
      values: [productId],
    };
    pool.query(query, (err, results) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  getMeta: (productId, cb) => {
    // const query = {
    //   text: 'SELECT *  '
    // },
  },

  postReview: (
    productId,
    rating,
    date,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics,
    cb,
  ) => {
    // const ins1 = 'INSERT INTO reviews (product_id, rating, date, summary, body, recommend,
    // reported, reviewer_name, reviewer_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    // const ins2 = 'DO $$ BEGIN FOR item IN $9 LOOP INSERT INTO photos (id, url) VALUES (item.id,
    // item.url) WHERE review_id = review_id END LOOP END $$';
    const query = {
      text: 'INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [productId, rating, date, summary, body, recommend, name, email],
    };
    pool.query(query, (err) => {
      if (err) {
        cb(err);
      } else {
        cb(null);
      }
    });
  },

  upvote: (reviewId, cb) => {
    const query = {
      text: 'UPDATE reviews SET helpfulness=helpfulness+1 WHERE id=$1',
      values: [reviewId],
    };
    pool.query(query, (err) => {
      if (err) {
        cb(err);
      } else {
        cb(null);
      }
    });
  },

  report: (reviewId, cb) => {
    const query = {
      text: 'UPDATE reviews SET reported=$1 WHERE id=$2',
      values: [true, reviewId],
    };
    pool.query(query, (err) => {
      if (err) {
        cb(err);
      } else {
        cb(null);
      }
    });
  },
};
