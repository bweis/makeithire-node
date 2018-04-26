const userHandler = require('../handlers/user');
const response = require('../util/response');
const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('find');
  res.status(200).json({ status: 'great user' });
});

router.post('/', async (req, res) => {
  try {
    const data = await userHandler.create(req.body);
    console.log(data);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.get('/:id', (req, res) => {
  console.log('get');
  res.status(200).json({ status: 'great company' });
});

router.patch('/:id', (req, res) => {
  console.log('patch');
  res.status(200).json({ status: 'great company' });
});


router.delete('/:id', (req, res) => {
  console.log('delete');
  res.status(200).json({ status: 'great company' });
});

module.exports = router;

//
// function createRecruiter(data) {
//   return new Promise((resolve, reject) => {
//     const {
//       user_type, email_address, first_name, middle_name, last_name, password, company_name, description, published, company_id,
//     } = data;
//     if (!validateEmail(email_address)) {
//       reject(handleParameterError('Invalid Parameters: Email is not formatted properly'));
//     }
//     bcrypt.hash(password, Number(process.env.ROUNDS), (err, hash) => {
//       const newUser = {
//         user_type,
//         first_name,
//         middle_name,
//         last_name,
//         email_address,
//         company_id,
//         company_name,
//         password: hash,
//       };
//       db.query('INSERT INTO user SET ?', newUser, (err1, res) => {
//         if (err1) {
//           return reject(handleDatabaseError(err1));
//         } else {
//
//         }
//       });
//     });
//
//
//
//
//     bcrypt.hash(password, Number(process.env.ROUNDS), (err, hash) => {
//       if (err) { return resolve(handleDatabaseError(err)); }
//       let post = {
//         FirstName: fname, MiddleName: mname, LastName: lname, EmailID: email, Password: hash, idCompany: idComp,
//       };
//       const sql1 = 'INSERT INTO User SET ?';
//       if (idComp === -1) {
//         db.query(sql1, post, (err1, res1) => {
//           if (err1) {
//             return res.sendStatus(400).json({ error: err1 });
//           }
//           if (companyname == null) {
//             post = {
//               CompanyName: null, Description: null, Logo: null, HashTags: null, idUser: res1.insertId, Published: 0, EmailDomain: emailDomain[1],
//             };
//           } else if (published == '1') {
//             post = {
//               CompanyName: companyname, Description: description, Logo: null, HashTags: null, idUser: res1.insertId, Published: published, EmailDomain: emailDomain[1],
//             };
//           } else {
//             post = {
//               CompanyName: companyname, Description: description, Logo: null, HashTags: null, idUser: res1.insertId, Published: published, EmailDomain: emailDomain[1],
//             };
//           }
//           const sql2 = 'INSERT INTO Company SET ?';
//           db.query(sql2, post, (err2, res2) => {
//             if (err2) {
//               return res.status(400).json({ error: err2 });
//             }
//
//             const sql3 = `UPDATE User SET idCompany = '${res2.insertId}' WHERE idUser = '${res1.insertId}'`;
//             db.query(sql3, (err3, res3) => {
//               if (err3) {
//                 return res.status(400).json({ error: err3 });
//               }
//
//               return res.status(200).json({ message: 'Account Created', response: res3 });
//             });
//           });
//         });
//       } else {
//         db.query(sql1, post, (err4, res4) => {
//           if (err4) {
//             return res.status(400).json({ error: err4 });
//           }
//
//           return res.status(200).json({ message: 'Account created' });
//         });
//       }
//     });
//   });
// }
