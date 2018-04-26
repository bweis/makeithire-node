const bcrypt = require('bcrypt');
const db = require('../util/db');
const { validateEmail } = require('../util/emailValidation');
const response = require('../util/response');
const companyHandler = require('../handlers/company');
const recruiterHandler = require('../handlers/recruiter');
const studentHandler = require('../handlers/student');

async function create(user_params) {
  return new Promise((resolve, reject) => {
    const {
      user_type, first_name, middle_name, last_name, email_address, password, company_name,
    } = user_params;
    let {
      company_id,
    } = user_params;
    const email_domain = email_address.split('@')[1];

    if (!validateEmail(email_address)) {
      reject(response.buildParamError('Invalid Parameters: Email is not formatted properly'));
      return;
    }

    bcrypt.hash(password, Number(process.env.ROUNDS), (err, hash) => {
      const new_user = {
        user_type,
        first_name,
        middle_name,
        last_name,
        email_address,
        password: hash,
      };
      db.query('INSERT INTO user SET ?', new_user, async (err, res) => {
        if (err) {
          return reject(response.buildDatabaseError(err));
        }
        const user_id = res.insertId;
        console.log(typeof user_type)
        switch (user_type.toString()) {
          case '0': // Student
            if (!email_domain.includes('.edu')) {
              return reject(response.buildParamError('Invalid Parameters: Email does not belong to educational institution'));
            }
            try {
              studentHandler.create({
                user_id,
              });
            } catch (err) {
              return reject(err);
            }
            return resolve(response.buildSuccess('Successfully added user', user_id));

          case '2': // Head Recruiter
            try {
              const company_data = await companyHandler.create({
                name: company_name,
                head_recruiter_id: user_id,
                email_domain,
              });
              company_id = company_data.data.company_id;
              console.log(company_data);
            } catch (err) {
              return reject(err);
            }

          case '1': // Recruiter
            try {
              await recruiterHandler.create({
                id: user_id,
                company_id,
              });
            } catch (err) {
              return reject(err);
            }
            return resolve(response.buildSuccess('Successfully added user', user_id));

          case '3': // Admin
            return reject(response.buildParamError('Can not make admin through API'));
          default:
            return reject(response.buildParamError('Invalid Parameters: Invalid user type'));
        }
      });
    });
  });
}

async function getById(user_id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, user_type, first_name, middle_name, last_name, email_address FROM user WHERE id = ?';
    db.query(sql, user_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Found User', res));
    });
  });
}

async function updateById(user_id, user_params) {
  return new Promise((resolve, reject) => {
    const allowedFields = [ 'first_name', 'middle_name', 'last_name' ];
    const formattedParams = {};
    allowedFields.forEach((field) => {
      if (field in user_params) formattedParams[field] = user_params[field];
    });

    const sql = 'update user SET ? WHERE id = ?';
    db.query(sql, [ formattedParams, user_id ], (err, res) => {
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
  updateById,
};
