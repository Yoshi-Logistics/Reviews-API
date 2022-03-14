const model = require('../models');

module.exports = {
  get: (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'relevant';
    model.reviews.get(page, count, sort, req.query.product_id, (err, results) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).send(results);
      }
    });
  },

  post: (req, res) => {
    model.reviews.post(Date.now(), req.body, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(201);
      }
    });
  },
};
