const db = require('../util/db');
const response = require('../util/response');

async function create(company_params) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO company SET ?';
    db.query(sql, company_params, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Successfully created company', { company_id: res.insertId }));
    });
  });
}

async function getAllCompanies(hasJobs) {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT id, name, description, head_recruiter_id, email_domain FROM company';
    let message = 'Found Companies';
    if (hasJobs === 'true') {
      sql = 'SELECT id, name, description, head_recruiter_id, email_domain FROM company WHERE id IN (SELECT DISTINCT company_id FROM job)';
      message = 'Found Companies with at least 1 job'
    }
    db.query(sql, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess(message, res));
    });
  });
}

async function getById(user_id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, name, description, head_recruiter_id, email_domain FROM company WHERE id = ?';
    db.query(sql, user_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Found Company', res));
    });
  });
}

async function getAllCompanyRecruiters(company_id) {
  return new Promise((resolve, reject) => {
    const sql = 'select id, user_type, first_name, middle_name, last_name, email_address from user where id in (select id from recruiter where' +
      ' company_id = ?)';
    db.query(sql, company_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Found Company', res));
    });
  });
}

async function updateById(company_id, company_params) {
  return new Promise((resolve, reject) => {
    const allowedFields = [ 'name', 'description' ];
    const formattedParams = {};
    allowedFields.forEach((field) => {
      console.log(typeof company_params[field]);
      if (field in company_params) formattedParams[field] = company_params[field];
    });

    console.log(formattedParams, company_id)
    const sql = 'update company SET ? WHERE id = ?';
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
  getById,
  getAllCompanyRecruiters,
  getAllCompanies,
  updateById,
};
