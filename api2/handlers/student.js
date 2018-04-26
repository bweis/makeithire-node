const db = require('../util/db');
const response = require('../util/response');

async function create(student_params) {
  const {
    user_id,
  } = student_params;
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO student (id) VALUES (?)', user_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
    });
    return resolve(response.buildSuccess('Successfully added user', user_id));
  });
}

async function patch(student_params) {
  const {
    user_id,
  } = student_params;
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO student (id) VALUES (?)', user_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
    });
    return resolve(response.buildSuccess('Successfully added user', user_id));
  });
}

module.exports = {
  create,
};
