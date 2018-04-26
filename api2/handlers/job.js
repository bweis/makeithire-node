const db = require('../util/db');
const response = require('../util/response');

async function create(job_params) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO job SET ?';
    db.query(sql, job_params, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Successfully created company', { job_id: res.insertId }));
    });
  });
}

async function getAllJobs(req) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT id, name, description, company_id, created, deadline, supplementary_question FROM job';
    if (req.query.company_id) {
      sql = 'SELECT id, name, description, company_id, created, deadline, supplementary_question FROM job WHERE company_id = ?';
    }
    console.log(sql);
    db.query(sql, req.query.company_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Retrieved Jobs', res));
    });
  });
}

async function getById(job_id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, name, description, company_id, created, deadline, supplementary_question FROM job WHERE id = ?';
    db.query(sql, job_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Found Job', res));
    });
  });
}

async function updateById(company_id, company_params) {
  return new Promise((resolve, reject) => {
    const allowedFields = [ 'name', 'description', 'created', 'deadline', 'supplementary_question' ];
    const formattedParams = {};
    allowedFields.forEach((field) => {
      console.log(typeof company_params[field]);
      if (field in company_params) formattedParams[field] = company_params[field];
    });

    console.log(formattedParams, company_id)
    const sql = 'update job SET ? WHERE id = ?';
    db.query(sql, [ formattedParams, company_id ], (err, res) => {
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
  getAllJobs,
  getById,
  updateById,
};
