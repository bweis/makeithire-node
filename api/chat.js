const db = require('./utils/db');
// const io = ('../server.js')
// var onlineUsers = {};

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
    var post2 = { RecruiterID: result[0].idUser, StudentID: req.body.StudentID };
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

function getRecruiterChats(req, res) {
  const sqlID = 'SELECT idUser FROM User WHERE EmailID = \'' + req.user.EmailID + '\'';
  db.query(sqlID, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    else {
      const sql = 'SELECT idChat, RecruiterID, B.FirstName AS RecruiterFirstName, StudentID, C.FirstName AS StudentFirstName FROM (SELECT * FROM Chat WHERE RecruiterID = '+result[0].idUser+') AS A, User AS B, User AS C WHERE A.RecruiterID = B.idUser AND A.StudentID = C.idUser';
      db.query(sql, (err2, result2) => {
        if (err2) {
          return res.status(400)
            .json({ error: err2 });
        }
        else {
          return res.status(200).json({ message: 'Success', response: result2 });
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
      const sql = 'SELECT idChat, RecruiterID, B.FirstName AS RecruiterFirstName, StudentID, C.FirstName AS StudentFirstName FROM (SELECT * FROM Chat WHERE StudentID = '+result[0].idUser+') AS A, User AS B, User AS C WHERE A.RecruiterID = B.idUser AND A.StudentID = C.idUser';
      db.query(sql, (err2, result2) => {
        if (err) {
          return res.status(400)
            .json({ error: err2 });
        }
        else {
          return res.status(200).json({ message: 'Success', response: result2 });
        }
      });
    }
  });
}

function getMessages(req, res) {
  const sql = 'SELECT Timestamp, idUser, Message FROM Message WHERE idChat = ' + req.body.idChat + ' ORDER BY Timestamp ASC';
  db.query(sqlID, (err, result) => {
    if (err) {
      return res.status(400)
        .json({ error: err });
    }
    return res.status(200)
      .json({ message: 'Success', response: result });
  });
}

function deleteChat(req, res) {
  var email = req.user.EmailID;
  var sql = 'SELECT idUser FROM User WHERE EmailID = ?';
  db.query(sql, email, (err1, result) => {
    if (err1) {
      return res.status(400).json({ error: err1 });
    }
    var sql2 = 'DELETE FROM Chat WHERE RecruiterID = ?'
    db.query(sql2, result[0].idUser, (err2, result2) => {
      if (err2) {
        return res.status(400).json({ error: err2 });
      }
      return res.status(200).json({ message: 'Success' });
    });
  });
}

// function getReceiver(idChat) {
//   const sql = 'SELECT * FROM Chat WHERE idChat = ?';
//   db.query(sqlID, idChat, (err, result) => {
//     if (err) {
//       return res.status(400)
//         .json({ error: err });
//     }
//     const sql2 = 'SELECT EmailID FROM User WHERE (idUser = ' + result[0].RecruiterID + ' OR idUser = ' + result[0].RecruiterID + ') AND EmailID != \'' + req.user.EmailID + '\'';
//     db.query(sql2, idChat, (err2, result2) => {
//       if (err2) {
//         return res.status(400)
//           .json({ error: err });
//       }
//       return res.status(200)
//         .json({ message: 'Success', response: result2[0].EmailID });
//     });
//   });
// }

// // SocketIO
// function onConnect(socket) {
//   onlineUsers[req.user.EmailID] = socket;

//   // New Message Window
//   socket.on('new window', function(data, callback) {
//       if (data in onlineUsers) {
//         callback(false);
//       }
//       else {
//         callback(true);
//         socket.nickname = data;
//         onlineUsers[socket.nickname] = socket;
//       }
//   });

//   // Disconnect
//   socket.on('disconnect', function() {
//     delete onlineUsers[socket.nickname];
//   });

//   // Send Message
//   socket.on('send message', function (data) {
//     var result = getReceiver(idChat);
//     if (result.response in onlineUsers) {
//       onlineUsers[result.response].emit('new message', {message: data.message, sender: socket.nickname});
//     }
//   });
// }

module.exports = {
  getMessages,
  getRecruiterChats,
  getStudentChats,
  createMessage,
  replyMessage,
};

// // JQuery
// <script src='/socket.io/socket.io.js'></script>
// var socket = io.connect();
// var $messageForm = $('#send-message');
// var $messageBox = $('message');
// var $chat = $('#chat');

// $messageForm.submit(function (e) {
//   e.preventDefault(); // Prevent refresh
//   // Send message from client to server
//   msg.message = messageBox.val();
//   msg.idChat = 0;
//   socket.emit('send message', msg)
//   messageBox.val('');   // Empty the message box
// });

// socket.on('new message'), function(data) {
//   // Display the new message
//   $chat.append(data.sendet + ': '+data.message+'<br/>');
// }