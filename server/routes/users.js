const Router = require('express-promise-router');
const db = require('../database');

const router = new Router();

module.exports = router;

// @route   POST /api/users
// @desc    Register a user (SignUp)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const { rows } = await db.query(
      'INSERT INTO users (id, last_name, first_name, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [body.id, body.last_name, body.first_name, body.email]
    );
    res.status(201).json({
      status: 'Success',
      data: {
        user: rows[0],
      },
    });
  } catch (err) {
    console.error(
      '\n',
      'Error: ',
      err.message,
      '\n',
      'Detail:',
      err.detail,
      '\n',
      'Table: ',
      err.table
    );
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/users
// @desc    Get logged in user data
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE id = $1',
      [req.body.id]
    );
    res.status(200).json({
      status: 'Success',
      data: {
        user: rows[0],
      },
    });
  } catch (err) {
    console.error(
      '\n',
      'Error: ',
      err.message,
      '\n',
      'Detail:',
      err.detail,
      '\n',
      'Table: ',
      err.table
    );
    res.status(500).send('Server Error');
  }
});
