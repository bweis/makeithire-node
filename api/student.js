const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const db = require('./utils/db');
const { getSignedUrl } = require('./utils/s3');

let email_string = '';
const storageR = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb) {
    cb(null, `${email_string}_Resume${path.extname(file.originalname)}`);
  },
});
const storageCV = multer.diskStorage({
  destination: './public/uploads/',
  filename(req, file, cb) {
    cb(null, `${email_string}_CoverLetter${path.extname(file.originalname)}`);
  },
});
const uploadR = multer({
  storage: storageR,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('resume');
const uploadCV = multer({
  storage: storageCV,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('coverletter');
// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf|jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: FilteType Not Supported!');
}


// POST API: Uploads Resume in Server (public/uploads)
function uploadResume(req, res) {
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      res.sendStatus(401).json({ error: auth_err });
    } else {
      const sql = 'SELECT EmailID FROM User WHERE TokenID = ?';
      db.query(sql, req.token, (err2, result) => {
        if (err2) {
          return res.status(401).json({ error: err });
        }
        const emailString = result[0].EmailID;
        const fileName = `${emailString}_Resume.pdf`;

        getSignedUrl(fileName, req.query.contentType, (signedUrl) => {
          console.log(signedUrl);
          if (signedUrl) {
            res.json({ signedUrl, fileName });
          } else {
            res.status(500).json({ success: false, message: 'Could not get signed URL' });
          }
        });
      });
    }
  });
}

// POST API: Uploads CoverLetter in Server (public/uploads)
function uploadCoverLetter(req, res) {
  console.log('Hey1');
  jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
    if (auth_err) {
      res.sendStatus(401).json({ error: auth_err });
    } else {
      const sql = 'SELECT EmailID FROM User WHERE TokenID = ?';
      db.query(sql, req.token, (err2, result) => {
        if (err2) {
          return res.status(401).json({ error: err });
        }

        console.log('Hey2');
        email_string = result[0].EmailID;
        uploadCV(req, res, (err) => {
          if (err) {
            res.status(400).json({ error: err });
          } else if (req.file == undefined) {
            res.status(400).json({ error: err, message: 'No File Selected' });
          } else {
            res.status(200).json({ message: 'Success', response: req.file });
          }
        });
      });
    }
  });
}

module.exports = {
  uploadCoverLetter,
  uploadResume,
};
