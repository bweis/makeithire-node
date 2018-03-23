const mysql = require('mysql');
const db = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_NAME,
});
db.connect((err) => {
  if (err) {
    console.error(`Database connection failed: ${err.stack}`);
    return;
  }
  console.log('Connected to MIH database.');
});


module.exports = db;
