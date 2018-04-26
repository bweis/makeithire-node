const db = require('../util/db');
const response = require('../util/response');

async function create(company_params) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO company SET ?';
    db.query(sql, company_params, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Successfully created company', res));
    });
  });
}

module.exports = {
  create,
};
