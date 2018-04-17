const db = require('./util/db');
const { validateEmail } = require('./util/emailValidation');
const { handleDatabaseError } = require('./util/errorHandler');

const errors = require('@feathersjs/errors');
const bcrypt = require('bcrypt');

module.exports = {
  async find(params) {
    console.log('find');
    return [];
  },
  async get(id, params) {
    console.log('get');
    return {
      text: `this is a get on ${id}`,
    };
  },
  async create(data, params) {
    if (data.user_type === '0') {
      return createStudent(data);
    } else if (data.user_type === '1') {
      return createRecruiter();
    }
    return new errors.BadRequest('Invalid Parameters: No such user_type');
  },
  async update(id, data, params) {
    console.log('update');
  },
  async patch(id, data, params) {
    console.log('patch');
  },
  async remove(id, params) {
    console.log('remove');
  },
  setup(app, path) {
    console.log('setup');
  },
};

function createStudent(data) {
  const {
    user_type, email_address, password, first_name, middle_name, last_name,
  } = data;
  if (!validateEmail(email_address)) {
    return new errors.BadRequest('Invalid Parameters: Email is not formatted properly');
  }
  // if (!email_address.includes('.edu')) {
  //   return new errors.BadRequest('Invalid Parameters: Email does not belong to educational institution');
  // }
  return new Promise((resolve) => {
    bcrypt.hash(password, Number(process.env.ROUNDS), (err, hash) => {
      const newUser = {
        user_type,
        first_name,
        middle_name,
        last_name,
        email_address,
        password: hash,
      };
      db.query('INSERT INTO user SET ?', newUser, (err1, res) => {
        if (err1) {
          resolve(handleDatabaseError(err1));
        }

        else {
          db.query('INSERT INTO student (id) VALUES (?)', res.insertId, (err2, res2) => {
            if (err2) {
              handleDatabaseError(err2);
            }
            else {
              resolve({ message: 'Account created' });
            }
          });
        }
      });
    });
  });
}

function createRecruiter(data) {
  const {
    user_type,
    email_address,
    first_name,
    middle_name,
    last_name,
    password,
    company_name,
    description,
    published,
    company_id,
  } = data;
  if (!validateEmail(email_address)) {
    return new errors.BadRequest('Invalid Parameters: Email is not formatted properly');
  }

  return new Promise((resolve) => {
    bcrypt.hash(password, Number(process.env.ROUNDS), (err, hash) => {
      if (err) { return resolve(handleDatabaseError(err)); }

      let post = {
        FirstName: fname, MiddleName: mname, LastName: lname, EmailID: email, Password: hash, idCompany: idComp,
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
        db.query(sql1, post, (err4, res4) => {
          if (err4) {
            return res.status(400).json({ error: err4 });
          }

          return res.status(200).json({ message: 'Account created' });
        });
      }
    });
  });
}


function signUpRecruiter(req, res) {
  const fname = req.body.FirstName;
  const mname = req.body.MiddleName;
  const lname = req.body.LastName;
  const email = req.body.EmailID;
  const pass = req.body.Password;
  const idComp = req.body.idCompany;
  const companyname = req.body.CompanyName;
  const description = req.body.Description;
  const emailDomain = req.body.EmailID.split('@', 2);
  const published = req.body.Published;

  bcrypt.hash(pass, Number(process.env.ROUNDS), (err, hash) => {
    if (err) {
      return res.status(401).json({ error: err });
    }

    let post = {
      FirstName: fname, MiddleName: mname, LastName: lname, EmailID: email, Password: hash, idCompany: idComp,
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
      db.query(sql1, post, (err4, res4) => {
        if (err4) {
          return res.status(400).json({ error: err4 });
        }

        return res.status(200).json({ message: 'Account created' });
      });
    }
  });
}
