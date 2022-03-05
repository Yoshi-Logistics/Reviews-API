const { Pool } = require('pg');

const pool = new Pool({
  user: 'jinicha',
  database: 'reviewsdb',
  port: 5432,
  host: 'localhost',
});

module.exports = { pool };
