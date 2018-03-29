const db = require('./utils/db');

function getMajors(req, res) {
  const sql = 'SELECT * FROM Major';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.status(200).json({ message: 'Success', response: result });
  });
}

function getDegrees(req, res) {
  const sql = 'SELECT * FROM Degree';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.status(200).json({ message: 'Success', response: result });
  });
}

function getUniversityList(req, res) {
  const sql = 'SELECT * FROM University';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.status(200).json({ message: 'Success', response: result });
  });
}

function getCompanyList(req, res) {
  const sql = 'SELECT * FROM Company';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.status(200).json({ message: 'Success', response: result });
  });
}

module.exports = {
  getMajors,
  getDegrees,
  getUniversityList,
  getCompanyList,
};
