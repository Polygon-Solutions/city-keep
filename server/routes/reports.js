const Router = require('express-promise-router');
const db = require('../database');

const router = new Router();

module.exports = router;

//Example route
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  res.send(rows[0]);
});
