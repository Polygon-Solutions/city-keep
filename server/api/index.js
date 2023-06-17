const users = require('./users');
const reports = require('./reports');

/** 
 * *
 * API Router
 * @description 
    - Exports the API to the server to allow users and 
      reports data to be used in the application.
    - Note: This API is only accessible locally.
 * @listens server.js
 */

module.exports = (app) => {
  app.use('/api/users', users);
  app.use('/api/reports', reports);
};
