const db = require('./utils/db');

function replyMessage(req,res) {
    //var email = req.user.EmailID;
    var email = req.body.EmailID;
    var sql = 'SELECT idUser FROM User WHERE EmailID = ?';
    db.query(sql, email, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      var currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const post = {FromID: result[0].idUser, ToID: req.body.ToID, Message: req.body.Message, Timestamp: currDate}
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

function getChats(req, res) {

}

function getMessages(req, res) {

}

module.exports = {
    getMessages,
    getChats,
    createMessage,
    replyMessage,
  };
  