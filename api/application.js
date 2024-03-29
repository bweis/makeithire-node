const db = require('./utils/db');

// Get Applicants for a Job
function getApplicants(req, res) {
  const idJobs = req.body.idJob;
  const sql = `SELECT idUser, FirstName, MiddleName, LastName, SubmissionDate, SupplementaryAs FROM Application NATURAL JOIN User WHERE idJobs = ${idJobs}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  });
}

function getApplication(req, res) {
    const sql = 'SELECT * FROM Application WHERE idApplication = ?';
    db.query(sql, req.body.idApplication, (err, result) => {
      if (err) {
        return res.status(400)
          .json({ error: err });
      }
      return res.status(200)
        .json({ message: 'Success', response: result });
    });
}

function apply(req, res) {
  var userId;
  const sqlId = 'Select idUser FROM User WHERE EmailID = \'' + req.user.EmailID +'\'';
  db.query(sqlId, (err, result) => {
    if(err) {
      return res.status(400)
        .json({ error: err });
    }
    else {
      userId = result[0].idUser;
      var currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const post = {
        idUser : userId,
        idJobs : req.body.idJobs,
        SubmissionDate : currDate,
        SupplementaryAs : req.body.SupplementaryAs
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
  });

}

module.exports = {
  getApplication,
  getApplicants,
  apply
};
