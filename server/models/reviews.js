const db = require('../db');

module.exports = {
  get: (page, count, sort, productId, cb) => {
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
    db.query(text, [productId])
      .then((results) => {
        cb(null, results.rows[0].json_build_object);
      })
      .catch((err) => {
        cb(err, null);
      });
  },

  post: (date, data, cb) => {
    const photosText = data.photos.map((url) => `((SELECT id FROM ins1), '${url}')`).join(',');

    const charText = Object.keys(data.characteristics).map((key) => `('${key}', (SELECT id FROM ins1), ${data.characteristics[key]})`).join(',');

    const text = `
      WITH ins1 AS
      (
        INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id
      )
    , ins2 AS
      (
        INSERT INTO photos (review_id, url)
        VALUES ${photosText}
      )
      INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
      VALUES ${charText}
    `;
    const values = [
      data.product_id,
      data.rating,
      date,
      data.summary,
      data.body,
      data.recommend,
      false,
      data.name,
      data.email,
      null,
      0,
    ];
    db.query(text, values)
      .then(() => {
        cb(null);
      })
      .catch((err) => {
        cb(err);
      });
  },
};
