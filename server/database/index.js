/** 
 * *
 * node-postgres (pg) Pool Configuration
 * @description 
    - Constructs a node-postgres Pool object
    - Configuration variables set by environment
    - https://node-postgres.com/apis/pool#new-pool
 * @listens ../routes/reports.js (db)
 * @listens ../routes/users.js (db)
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
