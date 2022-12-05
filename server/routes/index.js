const users = require('./users');
const reports = require('./reports');

module.exports = (app) => {
  app.use('/users', users);
  app.use('/reports', reports);
};
