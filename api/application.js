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

function apply(req, res) {
  const post = {
    idApplication = req.body.idApplication,
    idUser = req.body.idUser,
    idJob = req.body.idJob,
    SubmissionDate = req.body.SubmissionDate,
    SupplementaryAs = req.body.SupplementaryAs
  }
  const sql = "INSERT INTO Application SET ?";
    db.query(sql , post, (err, result) => {
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
  apply
};
