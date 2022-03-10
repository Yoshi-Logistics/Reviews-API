const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

router.put('/:review_id/helpful', async (req, res) => {
  const reviewId = req.params.review_id;
  const text = 'UPDATE reviews SET helpfulness=helpfulness+1 WHERE id=$1';

  try {
    await db.query(text, [reviewId]);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
});
