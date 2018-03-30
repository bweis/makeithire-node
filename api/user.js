const db = require('./utils/db');

// GET API: Get Student Details
function getUserDetails(req, res) {
  const sql = 'SELECT idUser, FirstName, MiddleName, LastName, EmailID  FROM User WHERE EmailID = ?';
  // const sql = 'SELECT * FROM User a LEFT OUTER JOIN Company b on a.idCompany = b.idCompany WHERE EmailID = ?';
  db.query(sql, req.user.EmailID, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ message: 'Success', response: result[0] });
  });
}

module.exports = {
  getUserDetails,
};
