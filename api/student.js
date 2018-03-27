const db = require('./utils/db');
const { getSignedUrl } = require('./utils/s3');

// POST API: Uploads Resume
function uploadResume(req, res) {
  const fileName = `${req.user.EmailID}_Resume.pdf`;
  handleS3Request(req, res, fileName);
}

// POST API: Uploads CoverLetter
function uploadCoverLetter(req, res) {
  const fileName = `${req.user.EmailID}_Cover_Letter.pdf`;
  handleS3Request(req, res, fileName);
}

// POST: Update Company Details
function updateCompanyDetails(req, res) {
  const companyname = req.body.CompanyName;
  const description = req.body.Description;
  const logo = req.body.Logo;
  const hashTags = req.body.HashTags;
  const published = req.body.Published;
  let sql = 'SELECT idCompany FROM Company WHERE idUser = (SELECT idUser FROM User WHERE EmailID = ?)';
  db.query(sql, req.user.EmailID, (err1, res1) => {
    if (err1) {
      return res.status(400)
        .json({ error: err1 });
    }
    db.query(sql, (err2, res2) => {
      if (err2) {
        return res.status(400)
          .json({ error: err2 });
      }
      sql = `UPDATE Company SET CompanyName = '${companyname}', Description = '${description}', Logo = ${logo}, HashTags = '${hashTags}', Published = '${published}' WHERE idCompany = '${res2[ 0 ].idCompany}'`;
      db.query(sql, (err3, res3) => {
        if (err3) {
          return res.status(400)
            .json({ error: err3 });
        }
        return res.status(200)
          .json({ message: 'Success' });
      });
    });
  });
}

// GET API: Get Student Details
function getStudentDetails(req, res) {
  const sql = 'SELECT * FROM Student WHERE idUser = (SELECT idUser FROM User WHERE EmailID = ?)';
  db.query(sql, req.user.EmailID, (err, res) => {
    if (err) {
      return res.status(400)
        .json({ message: err });
    }
    console.log(res);
    return res.status(200)
      .json({
        message: 'Success',
        response: res,
      });
  });
}

module.exports = {
  uploadCoverLetter,
  uploadResume,
  updateCompanyDetails,
  getStudentDetails,
};

function handleS3Request(req, res, fileName) {
  getSignedUrl(fileName, req.query.contentType, (signedUrl) => {
    if (signedUrl) {
      res.json({
        signedUrl,
        fileName,
      });
    } else {
      res.status(500)
        .json({
          success: false,
          message: 'Could not get signed URL',
        });
    }
  });
}
