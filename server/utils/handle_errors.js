/** 
 * *
 * Handle Errors Util
 * @description 
    - Formats and sends errors to whichever console is 
      running the Express server
 * @listens ../routes/reports.js
 * @listens ../routes/users.js
 */

function handleErrors(res, err) {
  console.error(
    `\nError: ${err.message}\nDetail: ${err.detail}\nTable: ${err.table}`
  );
  res.status(500).send('Server Error');
}

module.exports = handleErrors;
