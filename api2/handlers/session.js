const response = require('../util/response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../util/db');

async function checkSession(email) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM user WHERE email_address = '${email}'`, (err, user_res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      const {
        id,
        user_type,
        email_address,
        first_name,
        middle_name,
        last_name,
      } = user_res[0];
      return resolve(response.buildSuccess('You are still logged in', {
        id,
        user_type,
        email_address,
        first_name,
        middle_name,
        last_name,
      }));
    });
  });
}

async function createSession(req) {
  return new Promise((resolve, reject) => {
    const {
      email_address,
      password,
    } = req.body;

    db.query(`SELECT * FROM user WHERE email_address = '${email_address}'`, (err, user_res) => { // Dont know how to make it work with ?
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      const {
        id,
        user_type,
        email_address,
        first_name,
        middle_name,
        last_name,
        password: hash,
      } = user_res[0];

      bcrypt.compare(password, hash, (err, auth_res) => {
        if (auth_res) {
          const profile = {
            id,
            email_address,
            user_type,
            first_name,
            middle_name,
            last_name,
          };
          const token = { token: jwt.sign(profile, process.env.JWT_SECRET, { expiresIn: '3h' }) };
          return resolve(response.buildSuccess('Successfully retrieved token', token));
        }
        return reject(response.buildParamError('Username/Password incorrect'));
      });
    });
  });
}


module.exports = {
  checkSession,
  createSession,
};
