const db = require('./utils/db');

function getAllCompaniesWithJobs(req,res) {
    const sql = 'SELECT idCompany, CompanyName FROM Company WHERE idCompany IN (SELECT DISTINCT idCompany FROM Jobs)';
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
  
      return res.status(200).json({ message: 'Success', response: result });
    });
}

function getCompanyDetails(req, res) {
    const sql = 'SELECT idCompany, CompanyName, Description, HashTags, idUser AS idHeadRecruiter FROM Company WHERE idCompany = ?';
    db.query(sql, req.body.idCompany, (err, result) => {
      if (err) {
        return res.status(400).json({ message: err });
      }  
      return res.status(200).json({ message: 'Success', response: result });
    });
}

// POST: Update Company Details
function updateCompanyDetails(req, res) {
  const companyname = req.body.CompanyName;
  const description = req.body.Description;
  const logo = req.body.Logo;
  const hashTags = req.body.HashTags;
  const published = req.body.Published;
  let sql = 'SELECT idCompany FROM Company WHERE idUser = (SELECT idUser FROM User WHERE EmailID = ?)';
  db.query(sql, req.user.EmailID, (err1, res1) => {
    if (err1) {
      return res.status(400)
        .json({ error: err1 });
    }
    db.query(sql, (err2, res2) => {
      if (err2) {
        return res.status(400)
          .json({ error: err2 });
      }
      sql = `UPDATE Company SET CompanyName = '${companyname}', Description = '${description}', Logo = ${logo}, HashTags = '${hashTags}', Published = '${published}' WHERE idCompany = '${res2[ 0 ].idCompany}'`;
      db.query(sql, (err3, res3) => {
        if (err3) {
          return res.status(400)
            .json({ error: err3 });
        }
        return res.status(200)
          .json({ message: 'Success' });
      });
    });
  });
}

module.exports = {
    getAllCompaniesWithJobs,
    getCompanyDetails,
    updateCompanyDetails,
}