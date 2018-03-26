const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Utils
const db = require('./utils/db');

function login(req, res) {
  const { EmailID: email, Password: pass } = req.body;
  const sql = `SELECT Password FROM User WHERE EmailID = '${email}'`;
  db.query(sql, (err, result) => {
    if (err || result.length !== 1) {
      console.log(err);
      return res.status(400).json({ message: 'Could not log in' });
    }
    const hash = result[0].Password;
    bcrypt.compare(pass, hash, (err, res2) => {
      if (res2) {
        const profile = { // THIS IS WHERE WE DEFINE JWT CONTENTS
          EmailID: email,
        };
        const token = jwt.sign(profile, process.env.JWT_SECRET, { expiresIn: '3h' });
        return res.status(200).json({ message: 'Success', token });
      }
      return res.status(400).json({ response: 'EmailID or Password Incorrect' });
    });
  });
}

function pingSession(req, res) {
  return res.status(200).json({ message: 'Success' });
}

module.exports = {
  login,
  pingSession,
};
