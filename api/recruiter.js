const { validateEmail } = require('./utils/emailValidation');
const bcrypt = require('bcrypt');
const db = require('./utils/db');
const nodemailer = require('nodemailer');
const generator = require('generate-password');

// As a HR, invite recruiter to signup
function requestRecruiter(req, res) {
  if (!validateEmail(req.body.EmailID)) {
    res.status(400)
      .json({ error: 'Bad Email Format' });
  }
  const sql = 'SELECT FirstName, MiddleName, LastName FROM User WHERE EmailID = ?';
  db.query(sql, req.body.EmailID, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    const fullname = `${result[0].FirstName} ${result[0].MiddleName} ${result[0].LastName}`;
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      host: 'mail.outlook.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'makeithire@outlook.com',
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const signature = ''; // TODO add head recruiter email here

    const mailOptions = {
      from: 'makeithire@outlook.com',
      to: req.body.EmailID,
      subject: 'Sign Up as a Recruiter in MakeItHire',
      text: 'Your Head Recruiter has requested you to sign up as a recruiter in MakeItHire. ' +
                'Please use the following link: \n www.makeithire.com/signup \n\n - MakeItHire Admin',
      html: signature,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400)
          .json({ error });
      }
      return res.status(200)
        .json({
          message: `Email Sent to ${req.body.EmailID}`,
          response: info.response,
        });
    });
  });
}

function getRecruiters(req, res) {
  const sql = 'SELECT idUser, FirstName, LastName FROM User WHERE idCompany = ?';
  db.query(sql, req.params.idCompany, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  });
}

module.exports = {
  requestRecruiter,
  getRecruiters,
};

// DEPRECATED
// POST API: Delete Recruiter
// function deleteRecruiter(req, res) {
//   const email = req.body.EmailID;
//   const sql = `DELETE FROM User WHERE EmailID = '${email}'`;
//   db.query(sql, (err, res) => {
//     if (err) {
//       return res.status(400)
//         .json({ error: err });
//     }
//
//     return res.status(200)
//       .json({ message: 'Success' });
//   });
// }

// DEPRECATED
// apiRouter.post('/requestDelete', verifyToken, (req, res) => {
//   const email = req.body.EmailToDelete;
//   const sql = 'SELECT idUser FROM User WHERE TokenID = ?';
//   jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
//     if (auth_err) {
//       return res.status(401).json({ error: auth_err });
//     }
//     db.query(sql, req.token, (db_err1, result) => {
//       if (db_err1) {
//         return res.status(400).json({ error: db_err1 });
//       }
//
//       const sql2 = 'INSERT INTO RecruiterDeleteRequests SET ?';
//       const post2 = { idHeadRecruiter: result[0].idUser, EmailToDelete: email };
//       db.query(sql2, post2, (db_err2, result2) => {
//         if (db_err2) {
//           return res.status(400).json({ error: db_err2 });
//         }
//
//         return res.status(200).json({ message: 'Success' });
//       });
//     });
//   });
// });


// DEPRECATED
// apiRouter.get('/isRecruiter', verifyToken, (req, res) => {
//   let compid = '';
//   let userid = '';
//   const sql = 'SELECT idCompany, idUser FROM User WHERE TokenID = ?';
//   db.query(sql, req.user.EmailID, (db_err1, result) => {
//     if (db_err1) {
//       return res.status(400).json({ error: db_err1 });
//     }
//
//     compid = result[0].idCompany;
//     userid = result[0].idUser;
//     if (compid == 0) {
//       return res.status(200).json({ message: 'Success', response: '0' });
//     }
//
//     const sql2 = 'SELECT idUser FROM Company WHERE idCompany = ?';
//     db.query(sql2, compid, (db_err2, result2) => {
//       if (db_err2) {
//         return res.status(400).json({ error: db_err2 });
//       }
//
//       if (userid == result2[0].idUser) {
//         return res.status(200).json({ message: 'Success', response: '2' });
//       }
//
//       return res.status(200).json({ message: 'Success', response: '1' });
//     });
//   });
// });
