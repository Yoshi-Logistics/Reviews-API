const model = require('../models');

module.exports = {
  put: (req, res) => {
    model.helpful.put(req.params.review_id, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  },
};
