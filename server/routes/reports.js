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
      'SELECT u.first_name "firstName", u.last_name "lastName", r.id, r.title, c.label category, r.description, r.report_time "reportTime", r.address FROM reports r INNER JOIN users u ON u.id = r.user_id INNER JOIN categories c ON c.id = r.category_id ORDER BY report_time DESC'
    );
    res.status(200).json({
      reports: rows,
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

// @route   GET /api/reports/:id
// @desc    Get user's reports
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT u.first_name "firstName", u.last_name "lastName", r.id, r.title, c.label category, r.description, r.report_time "reportTime", r.address FROM reports r INNER JOIN users u ON u.id = r.user_id INNER JOIN categories c ON c.id = r.category_id WHERE user_id = $1 ORDER BY report_time DESC',
      [req.params.id]
    );
    res.status(200).json({
      reports: rows,
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
