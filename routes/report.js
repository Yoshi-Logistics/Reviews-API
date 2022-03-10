const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

router.put('/:review_id/report', async (req, res) => {
  const reviewId = req.params.review_id;
  const text = 'UPDATE reviews SET reported=$1 WHERE id=$2';

  try {
    await db.query(text, [true, reviewId]);
    res.sendStatus(204);
  } catch {
    res.sendStatus(400);
  }
});
