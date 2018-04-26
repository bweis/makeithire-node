const db = require('../util/db');
const response = require('../util/response');

async function create(application_params) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO application SET ?';
    db.query(sql, application_params, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Successfully created application', { application_id: res.insertId }));
    });
  });
}

async function getById(user_id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, user_id, job_id, submitted, supplementary_answer answer FROM application WHERE id = ?';
    db.query(sql, user_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Found application', res));
    });
  });
}

async function getAllApplications(query_params) {
  return new Promise((resolve, reject) => {
    const {
      user_id,
      job_id,
    } = query_params;
    let sql = 'SELECT id, user_id, job_id, submitted, supplementary_answer FROM application';
    if (user_id) {
      sql = 'SELECT id, user_id, job_id, submitted, supplementary_answer FROM application WHERE user_id = ?';
    } else if (job_id) {
      sql = 'SELECT id, user_id, job_id, submitted, supplementary_answer FROM application WHERE job_id = ?';
    }

    db.query(sql, user_id || job_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Found Companies', res));
    });
  });
}

async function updateById(application_id, application_params) {
  return new Promise((resolve, reject) => {
    const allowedFields = [ 'supplementary_answer' ];
    const formattedParams = {};
    allowedFields.forEach((field) => {
      if (field in application_params) formattedParams[field] = application_params[field];
    });

    const sql = 'update application SET ? WHERE id = ?';
    db.query(sql, [ formattedParams, application_id ], (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Successfully updated', formattedParams));
    });
  });
}

module.exports = {
  create,
  getById,
  getAllApplications,
  updateById,
};
