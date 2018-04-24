const db = require('./utils/db');

function replyMessage(req, res) {
  //var email = req.user.EmailID;
  var email = req.body.EmailID;
  var sql = 'SELECT idUser FROM User WHERE EmailID = ?';
  db.query(sql, email, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    var currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const post = { FromID: result[0].idUser, ToID: req.body.ToID, Message: req.body.Message, Timestamp: currDate }
    var sql2 = 'INSERT INTO Chat SET ?'
    db.query(sql2, post, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ message: 'Success', response: result });
    });
  });
}

function createMessage(req, res) {

}

function getRecruiterChats(req, res) {
  const sqlID = 'SELECT idUser FROM User WHERE EmailID = \'' + req.user.EmailID + '\'';
  db.query(sqlID, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    else {
      const sql = 'SELECT * FROM Chat WHERE RecruiterID = ' + result[0].idUser;
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(400)
            .json({ error: err });
        }
        else {
          return res.status(200).json({ message: 'Success', response: result });
        }
      });
    }
  });


}

function getStudentChats(req, res) {
  const sqlID = 'SELECT idUser FROM User WHERE EmailID = \'' + req.user.EmailID + '\'';
  db.query(sqlID, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    else {
      const sql = 'SELECT * FROM Chat WHERE StudentID = ' + result[0].idUser;
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(400)
            .json({ error: err });
        }
        else {
          return res.status(200).json({ message: 'Success', response: result });
        }
      });
    }
  });


}

function getMessages(req, res) {

}

module.exports = {
  getMessages,
  getRecruiterChats,
  getStudentChats,
  createMessage,
  replyMessage,
};
