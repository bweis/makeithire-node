const router = require('express').Router();
const db = require('../util/db');
const response = require('../util/response');

router.get('/', (req, res) => {
  console.log('find major');
  const sql = 'SELECT * FROM major';
  db.query(sql, (err, data) => {
    if (err) {
      return response.sendError(res, response.buildDatabaseError(err));
    }
    return response.sendSuccess(res, response.buildSuccess('Successfully retrieved majors', data));
  });
});

module.exports = router;
