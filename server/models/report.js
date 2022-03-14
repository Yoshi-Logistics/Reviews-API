const db = require('../db');

module.exports = {
  put: (reviewId, cb) => {
    const text = 'UPDATE reviews SET reported=$1 WHERE id=$2';
    db.query(text, [true, reviewId])
      .then(() => {
        cb(null);
      })
      .catch((err) => {
        cb(err);
      });
  },
};
