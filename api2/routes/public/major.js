const router = require('express').Router();
const db = require('../../util/db');
const response = require('../../util/response');

router.get('/', (req, res) => {
  console.log('find major');
  const sql = 'SELECT * FROM Major';
  db.query(sql, (err, data) => {
    if (err) {
      return response.errorDatabase(res, err);
    }
    return response.success(res, data);
  });
});

module.exports = router;
