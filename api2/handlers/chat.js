const db = require('../util/db');
const response = require('../util/response');

async function create(chat_parms) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO chat SET ?';
    db.query(sql, chat_parms, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Successfully created chat', { chat_id: res.insertId }));
    });
  });
}

async function getChats(query_params) {
  return new Promise((resolve, reject) => {
    const {
      student_id,
      recruiter_id,
    } = query_params;
    let sql = 'SELECT id, student_id, recruiter_id FROM chat';
    if (student_id) {
      sql = 'SELECT id, student_id, recruiter_id FROM chat WHERE student_id = ?';
    } else if (recruiter_id) {
      sql = 'SELECT id, student_id, recruiter_id FROM chat WHERE recruiter_id = ?';
    } else {
      return reject(response.buildParamError('Must have a query parameter'));
    }
    db.query(sql, student_id || recruiter_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Found Chats', res));
    });
  });
}

async function getById(chat_id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT id, student_id, recruiter_id FROM chat WHERE id = ?';
    db.query(sql, chat_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Found chat', res));
    });
  });
}

async function createMessage(req) {
  const message = {
    chat_id: req.params.id,
    sent: new Date(),
    text: req.body.text,
    author: req.user.user_type === '0' ? 'student' : 'recruiter',
  };
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO message SET ?';
    db.query(sql, message, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Successfully created message', { message }));
    });
  });
}

async function getMessages(chat_id) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT text, sent, author FROM message WHERE chat_id = ? ORDER by sent DESC';
    db.query(sql, chat_id, (err, res) => {
      if (err) {
        return reject(response.buildDatabaseError(err));
      }
      return resolve(response.buildSuccess('Found messages', res));
    });
  });
}

module.exports = {
  create,
  getChats,
  getById,
  createMessage,
  getMessages,
};
