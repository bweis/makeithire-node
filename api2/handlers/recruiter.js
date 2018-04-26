const db = require('../util/db');
const response = require('../util/response');

async function create(recruiter_params) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO recruiter SET ?';
    db.query(sql, recruiter_params, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Successfully created recruiter', res));
    });
  });
}

module.exports = {
  create,
};
