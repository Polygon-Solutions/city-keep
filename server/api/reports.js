const Router = require('express-promise-router');
const db = require('../database');

const handleErrors = require('../utils/handle_errors');

const router = new Router();

module.exports = router;

/** 
 * *
 * Reports API
 * @description 
    - Uses the express-promise-router to construct an API 
      for the reports feature of the application.
 * @listens /api/reports
 */

/** 
 * *
 * Create New Report
 * @description 
    - Adds a new report to the database
 * @fires db.query
 * @returns 201 response with report object
 * @throws handleErrors()
 * @route POST /api/reports
 * @access private
 */
router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const {
      rows: [report],
    } = await db.query(
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
      report,
    });
  } catch (err) {
    handleErrors(res, err);
  }
});

/** 
 * *
 * Get All Reports
 * @description 
    - Gets the 50 most recent reports from the database
 * @fires db.query
 * @returns 200 response with array of report objects
 * @throws handleErrors()
 * @route GET /api/reports
 * @access private
 */
router.get('/', async (req, res) => {
  try {
    const { rows: reports } = await db.query(
      'SELECT u.first_name "firstName", u.last_name "lastName", r.id, r.title, c.label category, r.description, r.report_time "reportTime", r.address FROM reports r INNER JOIN users u ON u.id = r.user_id INNER JOIN categories c ON c.id = r.category_id ORDER BY report_time DESC LIMIT 50'
    );
    res.status(200).json({
      reports,
    });
  } catch (err) {
    handleErrors(res, err);
  }
});

/** 
 * *
 * Get User's Reports
 * @description 
    - Gets the user's 50 most recent reports from the database
 * @fires db.query
 * @returns 200 response with array of report objects
 * @throws handleErrors()
 * @route GET /api/reports/:id
 * @access private
 */
router.get('/:id', async (req, res) => {
  try {
    const { rows: reports } = await db.query(
      'SELECT u.first_name "firstName", u.last_name "lastName", r.id, r.title, c.label category, r.description, r.report_time "reportTime", r.address FROM reports r INNER JOIN users u ON u.id = r.user_id INNER JOIN categories c ON c.id = r.category_id WHERE user_id = $1 ORDER BY report_time DESC LIMIT 50',
      [req.params.id]
    );
    res.status(200).json({
      reports,
    });
  } catch (err) {
    handleErrors(res, err);
  }
});
