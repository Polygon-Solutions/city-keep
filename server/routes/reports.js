const Router = require('express-promise-router');
const db = require('../database');

const router = new Router();

module.exports = router;

// @route   POST /api/reports
// @desc    Create a new report
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const { rows } = await db.query(
      'INSERT INTO reports (user_id, title, category_id, description, report_time, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        body.user_id,
        body.title,
        body.category_id,
        body.description,
        body.report_time,
        body.address,
      ]
    );
    res.status(201).json({
      report: rows[0],
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

// @route   GET /api/reports
// @desc    Get all reports
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM reports ORDER BY report_time DESC LIMIT 50'
    );
    res.status(200).json({
      status: 'Success',
      data: {
        reports: rows,
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

// @route   GET /api/reports/user
// @desc    Get user's reports
// @access  Private
router.get('/user', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM reports WHERE user_id = $1 ORDER BY report_time DESC',
      [req.body.user_id]
    );
    res.status(200).json({
      status: 'Success',
      data: {
        reports: rows,
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
