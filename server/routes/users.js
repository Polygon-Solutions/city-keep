const Router = require('express-promise-router');
const db = require('../database');

const handleErrors = require('../utils/handle_errors');

const router = new Router();

module.exports = router;

// @route   POST /api/users
// @desc    Register a user (SignUp)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const {
      rows: [user],
    } = await db.query(
      'INSERT INTO users (id, last_name, first_name, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [body.userId, body.lastName, body.firstName, body.email]
    );
    res.status(201).json({
      user,
    });
  } catch (err) {
    handleErrors(res, err);
  }
});

// @route   GET /api/users
// @desc    Get logged in user data
// @access  Private
router.get('/', async (req, res) => {
  try {
    const {
      rows: [user],
    } = await db.query('SELECT * FROM users WHERE id = $1', [
      req.header('User-Id'),
    ]);
    res.status(200).json({
      user,
    });
  } catch (err) {
    handleErrors(res, err);
  }
});
