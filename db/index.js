const { Pool } = require('pg');
const { config } = require('../config');

const pool = new Pool({
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port,
  host: config.host,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
