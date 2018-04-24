const db = require('./utils/db');

function replyMessage(req, res) {
    var email = req.user.EmailID;
    var sql = 'SELECT idUser FROM User WHERE EmailID = ?';
    db.query(sql, email, (err1, result) => {
        if (err1) {
            return res.status(400).json({ error: err1 });
        }
        var currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const post = { idChat: req.body.idChat, Message: req.body.Message, Timestamp: currDate, idUser: result[0].idUser }
        var sql2 = 'INSERT INTO Message SET ?'
        db.query(sql2, post, (err2, result2) => {
            if (err2) {
                return res.status(400).json({ error: err2 });
            }
            return res.status(200).json({ message: 'Success', response: result2 });
        });
    });
}

function createMessage(req, res) {
    var email = req.user.EmailID;
    var sql = 'SELECT idUser FROM User WHERE EmailID = ?';
    db.query(sql, email, (err1, result) => {
        if (err1) {
            return res.status(400).json({ error: err1 });
        }
        var sql2 = 'INSERT INTO Chat SET ?';
        var post2 = {RecruiterID: result[0].idUser, StudentID: req.body.StudentID};
        db.query(sql2, post2, (err2, result2) => {
            if (err2) {
                return res.status(400).json({ error: err2 });
            }
            var currDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            var sql3 = 'INSERT INTO Message SET ?'
            const post3 = { idChat: result2.insertId, Message: req.body.Message, Timestamp: currDate, idUser: result[0].idUser }
            db.query(sql3, post3, (err3, result3) => {
                if (err3) {
                    return res.status(400).json({ error: err3 });
                }
                return res.status(200).json({ message: 'Success', response: result3 });
            });
        });
    });
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
