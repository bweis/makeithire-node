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

module.exports = {
    getAllCompaniesWithJobs,
    getCompanyDetails
}