const router = require('express').Router();
const db = require('../util/db');
const response = require('../util/response');

router.get('/', (req, res) => {
  console.log('find university');
  const sql = 'SELECT * FROM university';
  db.query(sql, (err, data) => {
    if (err) {
      return response.sendError(res, response.buildDatabaseError(err));
    }
    return response.sendSuccess(res, response.buildSuccess('Successfully retrieved universities', data));
  });
});

module.exports = router;
