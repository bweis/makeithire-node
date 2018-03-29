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

module.exports = {
  getApplicants,
};
