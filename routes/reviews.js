const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const sort = req.query.sort || 'relevant';
  const productId = req.query.product_id;

  let order;
  if (sort === 'relevant') {
    order = 'reviews.date DESC, reviews.helpfulness DESC';
  } else if (sort === 'date') {
    order = 'reviews.date DESC';
  } else {
    order = 'reviews.helpfulness DESC';
  }

  const text = `
    SELECT json_build_object
      (
        'product', '${productId}',
        'page', ${page},
        'count', ${count},
        'results',
        (
          SELECT json_agg
          (
            json_build_object
            (
              'review_id', reviews.id,
              'rating', reviews.rating,
              'summary', reviews.summary,
              'recommend', reviews.recommend,
              'response', reviews.response || null,
              'body', reviews.body,
              'date', to_timestamp(reviews.date/1000)::date,
              'reviewer_name', reviews.reviewer_name,
              'helpfulness', reviews.helpfulness,
              'photos',
              (
                SELECT coalesce
                (
                  json_agg
                  (
                    json_build_object
                    (
                    'id', photos.id,
                    'url', photos.url
                    )
                  )
                  ::json, '[]'::json
                )
                FROM photos
                WHERE photos.review_id = reviews.id
              )
            )
            ORDER BY ${order}
          )
          FROM reviews
          WHERE reviews.product_id=$1 AND reviews.reported=false
        )
      )`;
  try {
    const { rows } = await db.query(text, [productId]);
    res.status(200).send(rows[0].json_build_object);
  } catch {
    res.status(400);
  }
});

router.post('/', async (req, res) => {
  const productId = req.body.product_id;
  const { rating } = req.body;
  const date = Date.now();
  const { summary } = req.body;
  const { body } = req.body;
  const { recommend } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const { photos } = req.body;
  const { characteristics } = req.body;

  let photosText = [];
  if (photos.length) {
    for (let i = 0; i < photos.length; i += 1) {
      photosText.push(`((SELECT id FROM ins1), '${photos[i]}')`);
    }
    photosText = photosText.join(',');
  }

  let charText = [];
  // let charReviewText = [];
  for (let i = 0; i < Object.keys(characteristics).length; i += 1) {
    const currentKey = Object.keys(characteristics)[i];
    charText.push(`((SELECT product_id FROM ins1), '${currentKey}')`);
    // charReviewText.push(`((SELECT id FROM ins3), (SELECT id FROM ins1), ${characteristics[currentKey]})`);
  }
  charText = charText.join(',');
  // charReviewText = charReviewText.join(',');

  const text = `
    WITH ins1 AS
      (
        INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id, product_id
      )
    , ins2 AS
      (
        INSERT INTO photos (review_id, url)
        VALUES ${photosText}
      )
      INSERT INTO characteristics (product_id, name)
      VALUES ${charText}
    `;
  const values = [productId, rating, date, summary, body, recommend, false, name, email, null, 0];

  try {
    await db.query(text, values);
    res.sendStatus(201);
  } catch (err) {
    // console.log(err, 'err in post');
    // console.log(text, values, 'text, values in post');
    res.sendStatus(400);
  }
});

// const text = `
// WITH ins1 AS
//   (
//     INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//     RETURNING id, product_id
//   )
// , ins2 AS
//   (
//     INSERT INTO photos (review_id, url)
//     VALUES ${photosText}
//   )
// , ins3 AS
//   (
//     INSERT INTO characteristics (product_id, name)
//     VALUES ${charText}
//     RETURNING id
//   )
// INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
// VALUES ${charReviewText}
// `;
