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
};
