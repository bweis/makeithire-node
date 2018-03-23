const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mime = require('mime-types');
const multer = require('multer');
const fs = require('fs');
const cookie = require('cookie');

// Utils
const db = require('../utils/db');
const { verifyToken } = require('../utils/auth');

// API Endpoints
const session = require('./session');

// Routers
const apiRouter = require('express').Router();

// Non-Authenticated Routes
apiRouter.post('/login', session.login);

// Authenticated Routes
apiRouter.post('/logout', verifyToken, session.logout);


// POST API: Add Student into User Table
apiRouter.post('/signUpStudent', (req, res) => {
  console.log(req.body);
  const fname = req.body.FirstName; const mname = req.body.MiddleName; const lname = req.body.LastName;
  const email = req.body.EmailID;
  const pass = req.body.Password;
  if (email === undefined || pass === undefined || email === '' || pass === '') {
    return res.status(400).json({ error: 'Email ID or Password cannot be empty' });
  }
  bcrypt.hash(req.body.Password, Number(process.env.ROUNDS), (err, hash) => {
    const post = {
      FirstName: fname, MiddleName: (mname === undefined) ? mname : '', LastName: lname, EmailID: email, Password: hash, idCompany: 0,
    };
    const sql = 'INSERT INTO User SET ?';
    db.query(sql, post, (db_err1, result) => {
      if (db_err1) {
        return res.status(400).json({ message: db_err1 });
      }

      sql2 = `INSERT INTO Student VALUES ('${result.insertId}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`;
      db.query(sql2, (db_err2, result2) => {
        if (db_err2) {
          return res.status(400).json({ error: db_err2 });
        }

        return res.status(200).json({ message: 'Account created' });
      });
    });
  });
});

// POST API: Add Student Details into Student Table
apiRouter.post('/updateStudentDetails', verifyToken, (req, res) => {
  const token = req.token;
  const university = req.body.University;
  const major = req.body.Major;
  const gradyear = req.body.GraduationYear;
  const curr_degree = req.body.CurrentPursuingDegree;
  const last_degree = req.body.HighestDegreeLevel;
  const skills = req.body.Skills;
  const projects = req.body.Projects;
  const bio = req.body.Bio;
  const phone = req.body.PhoneNumber;
  const links = req.body.Links;
  const resume = null;
  const coverLetter = null;

  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      res.sendStatus(401).json({ error: auth_err });
    } else {
      const sql = `UPDATE Student SET University = (SELECT idUniversity From University WHERE UnivName =  '${university}'), Major = (SELECT idMajor From Major WHERE MajorName =  '${major}'), GraduationYear = ${gradyear}, CurrentPursuingDegree = (SELECT idDegree From Degree WHERE Level = '${curr_degree}'), HighestDegreeLevel = (SELECT idDegree From Degree WHERE Level = '${last_degree}'), Skills = '${skills}', Projects = '${projects}', Bio = '${bio}', PhoneNumber = '${phone}', Links = '${links}' WHERE idUser = (SELECT idUser FROM User WHERE TokenID = '${token}')`;
      db.query(sql, (db_err1, result) => {
        if (db_err1) {
          return res.status(400).json({ error: db_err1 });
        }

        return res.status(200).json({ message: 'Success' });
      });
    }
  });
});

// GET API: Get Student Details
apiRouter.get('/getStudentDetails', verifyToken, (req, res) => {
  const sql = 'SELECT * FROM Student WHERE idUser = (SELECT idUser FROM User WHERE TokenID = ?)';
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      return res.status(401).json({ error: auth_err });
    }
    db.query(sql, req.token, (err1, result) => {
      if (err1) {
        return res.status(400).json({ message: err1 });
      }

      console.log(result);
      return res.status(200).json({ message: 'Success', response: result });
    });
  });
});


// GET API: Get Student Details
apiRouter.get('/getUserDetails', verifyToken, (req, res) => {
  let compid = '';
  let userid = '';
  const sql = 'SELECT * FROM User WHERE TokenID = ?';
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      return res.status(401).json({ error: auth_err });
    }
    db.query(sql, req.token, (err1, result) => {
      if (err1) {
        return res.status(400).json({ error: err1 });
      }

      compid = result[0].idCompany;
      userid = result[0].idUser;
      if (compid == 0) {
        result[0].type = 0;
        return res.status(200).json({ message: 'Success', response: result[0] });
      }

      const sql2 = 'SELECT idUser FROM Company WHERE idCompany = ?';
      db.query(sql2, compid, (db_err2, result2) => {
        if (db_err2) {
          return res.status(400).json({ error: db_err2 });
        }

        if (userid == result2[0].idUser) {
          result[0].type = 2;
          return res.status(200).json({ message: 'Success', response: result[0] });
        }

        result[0].type = 1;
        return res.status(200).json({ message: 'Success', response: result[0] });
      });
    });
  });
});


// GET API: Get Company List
apiRouter.get('/getCompanyList', (req, res) => {
  const sql = 'SELECT * FROM Company';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.status(200).json({ message: 'Success', response: result });
  });
});


// POST API: Sign Up Recruiter along with Company and Assigning Head Recruiter
apiRouter.post('/signUpRecruiter', (req, res) => {
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
      db.query(sql1, post, (db_err1, result1) => {
        if (db_err1) {
          return res.sendStatus(400).json({ error: db_err1 });
        }
        if (companyname == null) {
          post = {
            CompanyName: null, Description: null, Logo: null, HashTags: null, idUser: result1.insertId, Published: 0, EmailDomain: emailDomain[1],
          };
        } else if (published == '1') {
          post = {
            CompanyName: companyname, Description: description, Logo: null, HashTags: null, idUser: result1.insertId, Published: published, EmailDomain: emailDomain[1],
          };
        } else {
          post = {
            CompanyName: companyname, Description: description, Logo: null, HashTags: null, idUser: result1.insertId, Published: published, EmailDomain: emailDomain[1],
          };
        }
        const sql2 = 'INSERT INTO Company SET ?';
        db.query(sql2, post, (db_err2, result2) => {
          if (db_err2) {
            return res.status(400).json({ error: db_err2 });
          }

          const sql3 = `UPDATE User SET idCompany = '${result2.insertId}' WHERE idUser = '${result1.insertId}'`;
          db.query(sql3, (db_err3, result3) => {
            if (db_err3) {
              return res.status(400).json({ error: db_err3 });
            }

            return res.status(200).json({ message: 'Account Created', response: result3 });
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
});

apiRouter.get('/isRecruiter', verifyToken, (req, res) => {
  let compid = '';
  let userid = '';
  const sql = 'SELECT idCompany, idUser FROM User WHERE TokenID = ?';
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      return res.status(401).json({ error: auth_err });
    }
    db.query(sql, req.token, (db_err1, result) => {
      if (db_err1) {
        return res.status(400).json({ error: db_err1 });
      }

      compid = result[0].idCompany;
      userid = result[0].idUser;
      if (compid == 0) {
        return res.status(200).json({ message: 'Success', response: '0' });
      }

      const sql2 = 'SELECT idUser FROM Company WHERE idCompany = ?';
      db.query(sql2, compid, (db_err2, result2) => {
        if (db_err2) {
          return res.status(400).json({ error: db_err2 });
        }

        if (userid == result2[0].idUser) {
          return res.status(200).json({ message: 'Success', response: '2' });
        }

        return res.status(200).json({ message: 'Success', response: '1' });
      });
    });
  });
});

// POST API: Request to Delete a Recruiter
apiRouter.post('/requestDelete', verifyToken, (req, res) => {
  const email = req.body.EmailToDelete;
  const sql = 'SELECT idUser FROM User WHERE TokenID = ?';
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      return res.status(401).json({ error: auth_err });
    }
    db.query(sql, req.token, (db_err1, result) => {
      if (db_err1) {
        return res.status(400).json({ error: db_err1 });
      }

      const sql2 = 'INSERT INTO RecruiterDeleteRequests SET ?';
      const post2 = { idHeadRecruiter: result[0].idUser, EmailToDelete: email };
      db.query(sql2, post2, (db_err2, result2) => {
        if (db_err2) {
          return res.status(400).json({ error: db_err2 });
        }

        return res.status(200).json({ message: 'Success' });
      });
    });
  });
});

// POST API: Delete Recruiter
apiRouter.post('/deleteRecruiter', verifyToken, (req, res) => {
  const fname = req.body.FirstName;
  const lname = req.body.LastName;
  const mname = req.body.MiddleName;
  const email = req.body.EmailID;
  const sql = `DELETE FROM User WHERE EmailID = '${email}'`;
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      return res.status(401).json({ error: auth_err });
    }
    db.query(sql, (db_err1, result) => {
      if (db_err1) {
        return res.status(400).json({ error: db_err1 });
      }

      return res.status(200).json({ message: 'Success' });
    });
  });
});

// POST: Update Company Details
apiRouter.post('/updateCompanyDetails', verifyToken, (req, res) => {
  const token = req.token;
  const companyname = req.body.CompanyName;
  const description = req.body.Description;
  const logo = req.body.Logo;
  const hashTags = req.body.HashTags;
  const published = req.body.Published;
  let sql = `SELECT idCompany FROM Company WHERE idUser = (SELECT idUser FROM User WHERE TokenID = '${token}')`;
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      return res.status(401).json({ error: auth_err });
    }
    db.query(sql, (db_err1, result) => {
      if (db_err1) {
        return res.status(400).json({ error: db_err1 });
      }

      db.query(sql, (db_err2, result1) => {
        if (db_err2) {
          return res.status(400).json({ error: db_err2 });
        }
        sql = `UPDATE Company SET CompanyName = '${companyname}', Description = '${description}', Logo = ${logo}, HashTags = '${hashTags}', Published = '${published}' WHERE idCompany = '${result1[0].idCompany}'`;
        db.query(sql, (db_err3, result) => {
          if (db_err3) {
            return res.status(400).json({ error: db_err3 });
          }

          return res.status(200).json({ message: 'Success' });
        });
      });
    });
  });
});




// GET API: Retreive List of Majors
apiRouter.get('/getMajors', (req, res) => {
  const sql = 'SELECT * FROM Major';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    return res.status(200).json({ message: 'Success', response: result });
  });
});

// GET API: Retreive List of Degree Levels
apiRouter.get('/getDegrees', (req, res) => {
  const sql = 'SELECT * FROM Degree';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.status(200).json({ message: 'Success', response: result });
  });
});

// GET API: Retreive List of Universities
apiRouter.get('/getUniversityList', (req, res) => {
  const sql = 'SELECT * FROM University';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    return res.status(200).json({ message: 'Success', response: result });
  });
});

// GET API: Retrive List of Company
apiRouter.get('/getCompanyList', (req, res) => {
  const sql = 'SELECT * FROM Company';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.status(200).json({ message: 'Success', response: result });
  });
});

// Multer Settings
let email_string = '';
const storageR = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb) {
    cb(null, `${email_string}_Resume${path.extname(file.originalname)}`);
  },
});
const storageCV = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb) {
    cb(null, `${email_string}_CoverLetter${path.extname(file.originalname)}`);
  },
});
const uploadR = multer({
  storage: storageR,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('resume');
const uploadCV = multer({
  storage: storageCV,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('coverletter');
// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf|jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: FilteType Not Supported!');
}

// POST API: Uploads Resume in Server (public/uploads)
apiRouter.post('/uploadResume', verifyToken, (req, res) => {
  console.log('heyBro');

  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      res.sendStatus(401).json({ error: auth_err });
    } else {
      const sql = 'SELECT EmailID FROM User WHERE TokenID = ?';
      db.query(sql, req.token, (err2, result) => {
        if (err2) {
          return res.status(401).json({ error: err });
        }

        console.log('heyBro');

        email_string = result[0].EmailID;

        uploadR(req, res, (err) => {
          if (err) {
            console.log(err);
            res.status(400).json({ error: err });
          } else if (req.file === undefined) {
            console.log('NO FILE SELECTED');
            res.status(400).json({ error: err, message: 'No File Selected' });
          } else {
            res.status(200).json({ message: 'Success', response: req.file });
          }
        });
      });
    }
  });
});

// POST API: Uploads CoverLetter in Server (public/uploads)
apiRouter.post('/uploadCoverLetter', verifyToken, (req, res) => {
  console.log('Hey1');
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      res.sendStatus(401).json({ error: auth_err });
    } else {
      const sql = 'SELECT EmailID FROM User WHERE TokenID = ?';
      db.query(sql, req.token, (err2, result) => {
        if (err2) {
          return res.status(401).json({ error: err });
        }

        console.log('Hey2');
        email_string = result[0].EmailID;
        uploadCV(req, res, (err) => {
          if (err) {
            res.status(400).json({ error: err });
          } else if (req.file == undefined) {
            res.status(400).json({ error: err, message: 'No File Selected' });
          } else {
            res.status(200).json({ message: 'Success', response: req.file });
          }
        });
      });
    }
  });
});


module.exports = apiRouter;
