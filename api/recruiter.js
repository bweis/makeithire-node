const db = require('./utils/db');

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
