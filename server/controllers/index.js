const model = require('../models');

module.exports = {
  getReviews: (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'relevant';
    model.getReviews(page, count, sort, req.query.product_id, (err, results) => {
      if (err) {
        res.sendStatus(400);
        console.log(err, 'err in getReviews');
      } else {
        res.status(200).send(results.rows[0].json_build_object);
      }
    });
  },

  getMeta: (req, res) => {
    model.getMeta(req.query.product_id, (err, results) => {
      if (err) {
        console.log(err, 'err in getMeta');
        res.sendStatus(400);
      } else {
        res.status(200).send(results);
      }
    });
  },

  postReview: (req, res) => {
    model.postReview(
      req.body.product_id,
      req.body.rating,
      Date.now(),
      req.body.summary,
      req.body.body,
      req.body.recommend,
      req.body.name,
      req.body.email,
      req.body.photos,
      req.body.characteristics,
      (err) => {
        if (err) {
          res.sendStatus(400);
          console.log(err, 'err in post');
        } else {
          res.sendStatus(201);
        }
      },
    );
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
