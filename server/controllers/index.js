const model = require('../models');

module.exports = {
  getReviews: (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    model.getReviews(page, count, req.query.sort, req.query.product_id, (err, results) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).send(results);
      }
    });
  },

  getMeta: (req, res) => {
    model.getMeta(req.query.product_id, (err, results) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).send(results);
      }
    });
  },

  postReview: (req, res) => {

  },

  upvote: (req, res) => {
    model.upvote(req.params.review_id, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  },

  report: (req, res) => {
    model.report(req.params.review_id, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  },
};
