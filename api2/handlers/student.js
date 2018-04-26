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

async function updateById(student_id, student_params) {
  return new Promise((resolve, reject) => {
    const allowedFields = [
      'university_id',
      'major_id',
      'graduation_year',
      'pursuing_degree',
      'highest_degree',
      'skills',
      'projects',
      'biography',
      'phone_number',
      'github_url',
      'linkedin_url',
    ];
    const formattedParams = {};
    allowedFields.forEach((field) => {
      formattedParams[field] = student_params[field];
    });

    const sql = 'update student SET ? WHERE id = ?';
    db.query(sql, [ formattedParams, student_id ], (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      console.log(res);
      return resolve(response.buildSuccess('Successfully updated', formattedParams));
    });
  });
}

module.exports = {
  create,
  updateById
};
