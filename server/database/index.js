const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'citykeep',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
