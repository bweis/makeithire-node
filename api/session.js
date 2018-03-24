const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Utils
const db = require('./utils/db');

// POST API: Login Function - Using Token Based Authentication
function login(req, res) {
  const email = req.body.EmailID;
  const pass = req.body.Password;
  if (email === undefined || pass === undefined || email === '' || pass === '') {
    return res.status(401).json({ error: 'Email ID or Password cannot be empty' });
  }
  const sql = `SELECT Password FROM User WHERE EmailID = '${email}'`;
  db.query(sql, (db_err1, result) => {
    if (db_err1) {
      return res.status(400).json({ error: db_err1 });
    }

    if (result.length === 0) {
      res.status(400).json({ error: 'No Email Found' });
      return;
    }
    const hash = result[0].Password;
    bcrypt.compare(pass, hash, (err, res2) => {
      if (res2) {
        // Passwords match
        const user = {
          EmailID: email,
          Password: pass,
        };
        jwt.sign({ user }, process.env.KEY, (auth_err, token) => {
          if (auth_err) {
            res.status(400).json({ error: auth_err });
          } else {
            const sql2 = `UPDATE User SET TokenID = '${token}' WHERE EmailID = '${email}'`;
            const sql3 = `SELECT FirstName FROM User WHERE EmailID = '${email}'`;
            let fname = '';
            db.query(sql3, (db_err2, result2) => {
              if (db_err2) {
                res.status(400).json({ error: db_err2 });
              } else {
                fname = result2[0].FirstName;
              }
            });
            db.query(sql2, (db_err3, result3) => {
              if (db_err3) {
                res.status(400).json({ error: db_err3 });
              } else {
                return res.status(200).json({ message: 'Success', token, FirstName: fname });
              }
            });
          }
        });
      } else {
        // Passwords don't match
        res.status(400).json({ response: 'EmailID or Password Incorrect' });
      }
    });
  });
}

// POST API: Logout User. Delete Token from DB
function logout(req, res) {
  // var cookies = cookie.parse(req.header.cookie);
  // jwt.verify(cookies.token, process.env.KEY, (err, authData) => {
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      return res.status(401).json({ message: 'Forbidden', error: auth_err });
    }
    const sql = 'UPDATE User SET TokenID = ? WHERE TokenID = ?';
    const post = [ null, req.token ];
    db.query(sql, post, (db_err1, result) => {
      if (db_err1) {
        return res.status(400).json({ error: db_err1 });
      }

      return res.status(200).json({ message: 'Success' });
    });
  });
}

module.exports = {
  login,
  logout,
};
