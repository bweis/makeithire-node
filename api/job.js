// To write all the apis related to functionality of jobs. E.g. get getJobDetails, getAllJobs, etc
const db = require('./utils/db');


function getAllJobs(req, res) {
  const sql = 'SELECT idJobs, CompanyName, JobName FROM Jobs INNER JOIN Company ON Jobs.idCompany = Company.idCompany';

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  });
}

function getCompanyJobs(req, res) {
  const sql = 'SELECT idJobs, JobName, Deadline FROM Jobs WHERE Jobs.idCompany = ?';

  db.query(sql, req.body.idCompany, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  })
}

function getJobDetails(req, res) {
  const idJobs = req.body.idJobs;
  const sql = `SELECT * FROM Jobs WHERE idJobs = ${idJobs}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  });
}

function addJobPosting(req, res) {
  const jobName = req.body.JobName;
  const description = req.body.Description;
  const idCompany = req.body.idCompany;
  const deadline = req.body.Deadline;
  const tags = req.body.Tags;
  const supplementaryQs = req.body.SupplementaryQs;
  var currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const post = {
    JobName: jobName,
    Description: description,
    idCompany: idCompany,
    DateAdded: currDate,
    Deadline: deadline,
    Tags: tags,
    SupplementaryQs: supplementaryQs,
  };

  const sql = 'INSERT INTO Jobs SET ?';
  db.query(sql, post, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  });
}

function editJobPosting(req, res) {
  const idJobs = req.body.idJobs;
  const jobName = req.body.JobName;
  const description = req.body.Description;
  const idCompany = req.body.idCompany;
  const deadline = req.body.Deadline;
  // const tags = ;
  const supplementalQs = req.body.supplementalQs;

  const post = {
    JobName: jobName,
    Description: description,
    idCompany,
    Deadline: deadline,
    // tags : ,
    SupplementalQ: supplementalQs,
  };

  const sql = `UPDATE Jobs VALUES SET ? WHERE idJobs = '${idJobs}'`;

  db.query(sql, post, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  });
}

function getEveryJobAndDetail(req, res) {
  const sqlID = 'SELECT idUser FROM User WHERE EmailID = \'' + req.user.EmailID + '\'';
  db.query(sqlID, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    else {
      var sql2 = 'SELECT B.idJobs, B.JobName, B.Description, C.CompanyName, C.idCompany, B.DateAdded, B.Deadline, B.Tags, B.SupplementaryQs, B.idApplication FROM (Select J.idJobs, JobName, Description, idCompany, DateAdded, Deadline, Tags, SupplementaryQs, idApplication FROM Jobs AS J LEFT JOIN (SELECT * FROM Application WHERE idUser = ' + result[0].idUser + ') AS A ON A.idJobs = J.idJobs) AS B INNER JOIN Company AS C ON C.idCompany = B.idCompany'
      db.query(sql2, (err2, result2) => {
        if (err) {
          return res.status(400)
            .json({ error: err2 });
        }
        return res.status(200)
          .json({ message: 'Success', response: result2 });
      });
    }
  });
}

module.exports = {
  getAllJobs,
  getJobDetails,
  addJobPosting,
  editJobPosting,
  getEveryJobAndDetail,
  getCompanyJobs

};
