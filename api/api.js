const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie');

// Utils
const db = require('./utils/db');
const { verifyToken } = require('./utils/auth');

// API Endpoints
const session = require('./session');
const registration = require('./registration');
const student = require('./student');
const user = require('./user');
const data = require('./data');

// Routers
const apiRouter = require('express').Router();

// Authenticated Routes
apiRouter.get('/ping', session.pingSession);
apiRouter.post('/login', session.login);

apiRouter.post('/signUpStudent', registration.signUpStudent);
apiRouter.post('/signUpRecruiter', registration.signUpRecruiter);

apiRouter.get('/uploadResume', student.uploadResume);
apiRouter.get('/uploadCoverLetter', student.uploadCoverLetter);

apiRouter.get('/getMajors', data.getMajors);
apiRouter.get('/getDegrees', data.getDegrees);
apiRouter.get('/getUniversityList', data.getUniversityList);
apiRouter.get('/getCompanyList', data.getCompanyList);

apiRouter.get('/getUserDetails', user.getUserDetails);

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
  db.query(sql, req.user.EmailID, (err1, result) => {
    if (err1) {
      return res.status(400).json({ message: err1 });
    }

    console.log(result);
    return res.status(200).json({ message: 'Success', response: result });
  });
});

apiRouter.get('/isRecruiter', verifyToken, (req, res) => {
  let compid = '';
  let userid = '';
  const sql = 'SELECT idCompany, idUser FROM User WHERE TokenID = ?';
  db.query(sql, req.user.EmailID, (db_err1, result) => {
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


module.exports = apiRouter;
