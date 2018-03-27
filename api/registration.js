const { validateEmail } = require('./utils/emailValidation');

const bcrypt = require('bcrypt');
const db = require('./utils/db');


function signUpStudent(req, res) {
  console.log(req.body);
  const fname = req.body.FirstName; const mname = req.body.MiddleName; const lname = req.body.LastName;
  const email = req.body.EmailID;
  const pass = req.body.Password;
  if (email === undefined || pass === undefined || email === '' || pass === '') {
    return res.status(400).json({ error: 'Email ID or Password cannot be empty' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Bad Email Format' });
  }
  if (!email.includes('.edu')) {
    return res.status(400).json({ error: 'Email not a Student Email. Email should include use .edu' });
  }
  bcrypt.hash(req.body.Password, Number(process.env.ROUNDS), (err, hash) => {
    const post = {
      FirstName: fname, MiddleName: (mname === undefined) ? mname : '', LastName: lname, EmailID: email, Password: hash, idCompany: 0,
    };
    const sql = 'INSERT INTO User SET ?';
    db.query(sql, post, (err1, res1) => {
      if (err1) {
        return res.status(400).json({ message: err1 });
      }
      const sql2 = `INSERT INTO Student VALUES ('${res1.insertId}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`;
      db.query(sql2, (err2, res2) => {
        if (err2) {
          return res.status(400).json({ error: err2 });
        }
        return res.status(200).json({ message: 'Account created' });
      });
    });
  });
}

function signUpRecruiter(req, res) {
  const fname = req.body.FirstName;
  const mname = req.body.MiddleName;
  const lname = req.body.LastName;
  const bdate = '00/00/0000';
  const email = req.body.EmailID;
  const pass = req.body.Password;
  const idComp = req.body.idCompany;
  const companyname = req.body.CompanyName;
  const description = req.body.Description;
  const emailDomain = req.body.EmailID.split('@', 2);
  const published = req.body.Published;
  if (email === undefined || pass === undefined || email === '' || pass === '') {
    return res.status(400).json({ error: 'Email ID or Password cannot be empty' });
  }
  bcrypt.hash(pass, Number(process.env.ROUNDS), (err, hash) => {
    if (err) {
      return res.status(401).json({ error: err });
    }

    let post = {
      FirstName: fname, MiddleName: mname, LastName: lname, BirthDate: bdate, EmailID: email, Password: hash, idCompany: idComp,
    };
    const sql1 = 'INSERT INTO User SET ?';
    if (idComp == '-1') {
      db.query(sql1, post, (err1, res1) => {
        if (err1) {
          return res.sendStatus(400).json({ error: err1 });
        }
        if (companyname == null) {
          post = {
            CompanyName: null, Description: null, Logo: null, HashTags: null, idUser: res1.insertId, Published: 0, EmailDomain: emailDomain[1],
          };
        } else if (published == '1') {
          post = {
            CompanyName: companyname, Description: description, Logo: null, HashTags: null, idUser: res1.insertId, Published: published, EmailDomain: emailDomain[1],
          };
        } else {
          post = {
            CompanyName: companyname, Description: description, Logo: null, HashTags: null, idUser: res1.insertId, Published: published, EmailDomain: emailDomain[1],
          };
        }
        const sql2 = 'INSERT INTO Company SET ?';
        db.query(sql2, post, (err2, res2) => {
          if (err2) {
            return res.status(400).json({ error: err2 });
          }

          const sql3 = `UPDATE User SET idCompany = '${res2.insertId}' WHERE idUser = '${res1.insertId}'`;
          db.query(sql3, (err3, res3) => {
            if (err3) {
              return res.status(400).json({ error: err3 });
            }

            return res.status(200).json({ message: 'Account Created', response: res3 });
          });
        });
      });
    } else {
      db.query(sql1, post, (db_err4, result1) => {
        if (db_err4) {
          return res.status(400).json({ error: db_err4 });
        }

        return res.status(200).json({ message: 'Account created' });
      });
    }
  });
}

module.exports = {
  signUpRecruiter,
  signUpStudent,
};
