const { pool } = require('../../db');

module.exports = {
  getReviews: (page, count, sort, productId, cb) => {
    const query = {
      text: 'SELECT * FROM reviews WHERE product_id = $1',
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
  postReview: () => {

  },
  upvote: (reviewId, cb) => {
    const query = {
      text: 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1',
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
      text: 'UPDATE reviews SET reported = $1 WHERE id = $2',
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
