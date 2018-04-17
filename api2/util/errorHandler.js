const errors = require('@feathersjs/errors');

function handleDatabaseError(err) {
  console.log(err);
  return new errors.BadRequest('This is a test');
}

module.exports = {
  handleDatabaseError,
}
