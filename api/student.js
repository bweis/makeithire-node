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

module.exports = {
  uploadCoverLetter,
  uploadResume,
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
