const users = require('./users');
const reports = require('./reports');

module.exports = (app) => {
  app.use('/api/users', users);
  app.use('/api/reports', reports);
};
