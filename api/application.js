const db = require('./utils/db');

// Get Applicants for a Job
function getApplicants(req, res) {
  const sql = 'SELECT idUser, FirstName, MiddleName, LastName, SubmissionDate, SupplementaryAs FROM Application NATURAL JOIN User WHERE idJob = ?';
  db.query(sql, req.body.idJob, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  });
}

function filterApplicants(req,res) {
  const sql = `SELECT idUser, m.idMajor, MajorName, idJob FROM (SELECT a.idUser, Major, a.idJob FROM Application a, Student s WHERE a.idUser = s.idUser) k INNER JOIN Major m ON k.Major = m.idMajor WHERE idMajor = '${req.body.idMajor}' AND idJob = '${req.body.idJob}'`
  db.query(sql, req.body.idMajor, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  });
}

module.exports = {
  getApplicants,
  filterApplicants
};
