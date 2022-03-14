const db = require('../db');

module.exports = {
  put: (reviewId, cb) => {
    const text = 'UPDATE reviews SET helpfulness=helpfulness+1 WHERE id=$1';
    db.query(text, [reviewId])
      .then(() => {
        cb(null);
      })
      .catch((err) => {
        cb(err);
      });
  },
};
