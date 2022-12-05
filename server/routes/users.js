const Router = require('express-promise-router');
const db = require('../database');

const router = new Router();

module.exports = router;

//Example route
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    console.log(rows[0]);
  } catch (err) {
    console.log('Error: ', err);
  }
});
