const Router = require('express-promise-router');
const db = require('../database');

const router = new Router();

module.exports = router;

// @route   POST /api/reports
// @desc    Create a new report
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const { rows } = await db.query(
      'INSERT INTO reports (user_id, category_id, description, report_time, address, longitude, latitude) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        body.user_id,
        body.category_id,
        body.description,
        body.report_time,
        body.address,
        body.longitude,
        body.latitude,
      ]
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
