const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('./utils/db');

function userByEmailQuery(email) {
  return `SELECT *, if(u.idCompany=0, true, false) as isStudent, if(u.idUser=c.idUser, true, false) as isHeadRecruiter from User u 
LEFT OUTER JOIN Student s ON u.idUser=s.idUser LEFT OUTER JOIN Company c on u.idCompany=c.idCompany WHERE EmailID = '${email}'`;
}

function login(req, res) {
  const { EmailID: email, Password: pass } = req.body;
  const sql = userByEmailQuery(email);
  db.query(sql, (err, result) => {
    if (err || result.length !== 1) {
      console.log(err);
      return res.status(400).json({ message: 'Could not log in' });
    }
    const {
      EmailID,
      FistName,
      MiddleName,
      LastName,
      BirthDate,
      Password: hash,
      idCompany,
      isStudent,
      isHeadRecruiter,
    } = result[0];
    bcrypt.compare(pass, hash, (err, res2) => {
      if (res2) {
        const profile = { // THIS IS WHERE WE DEFINE JWT CONTENTS
          EmailID: email,
        };
        const token = jwt.sign(profile, process.env.JWT_SECRET, { expiresIn: '3h' });
        const user = {
          EmailID,
          FistName,
          MiddleName,
          LastName,
          BirthDate,
          idCompany,
          isStudent,
          isHeadRecruiter,
          isAdmin: EmailID === 'makeithire@outlook.com', // THIS IS REALLY REALLY BAD.  THIS IS DUMB AND I HATE IT.
        };
        return res.status(200).json({ message: 'Success', user, token });
      }
      return res.status(400).json({ response: 'EmailID or Password Incorrect' });
    });
  });
}

function getSession(req, res) {
  const sql = userByEmailQuery(req.user.EmailID);
  db.query(sql, (err, result) => {
    if (err || result.length !== 1) {
      console.log(err);
      return res.status(400).json({ message: 'Could not log in' });
    }
    const {
      EmailID,
      FistName,
      MiddleName,
      LastName,
      BirthDate,
      idCompany,
      isStudent,
      isHeadRecruiter,
    } = result[0];

    const user = {
      EmailID,
      FistName,
      MiddleName,
      LastName,
      BirthDate,
      idCompany,
      isStudent,
      isHeadRecruiter,
      isAdmin: EmailID === 'makeithire@outlook.com', // THIS IS REALLY REALLY BAD.  THIS IS DUMB AND I HATE IT.
    };
    return res.status(200).json({ message: 'Success', user });
  });
}

module.exports = {
  login,
  getSession,
};
