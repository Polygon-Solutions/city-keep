const Router = require('express-promise-router');
const db = require('../database');

const handleErrors = require('../utils/handle_errors');

const router = new Router();

module.exports = router;

/** 
 * *
 * Users API
 * @description 
    - Uses the express-promise-router to construct an API 
      for the users (accounts) feature of the application
    - Note: The authentication of the user is handled by 
            AWS Cognito. This API connects to the PostgreSQL 
            database which holds the user's personal 
            information, such as the first and last name.
 * @listens /api/users
 */

/** 
 * *
 * Register a User
 * @description 
    - Adds a user to the database if it doesn't exist.
 * @fires db.query
 * @returns 201 response with the user object
 * @throws handleErrors()
 * @route POST /api/users
 * @access public
 */
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
/** 
 * *
 * Get User Data
 * @description 
    - Gets the user data using the User-Id from the 
      AWS Cognito session cookie.
 * @param {string} req.header('User-Id')
 * @fires db.query
 * @returns 200 response with the user object
 * @throws handleErrors()
 * @route POST /api/users
 * @access public
 */
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
