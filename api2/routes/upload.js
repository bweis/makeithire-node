const response = require('../util/response');
const expressJwt = require('express-jwt');
const { getSignedUrl } = require('../util/s3');

const router = require('express').Router();

// Get urls for certain uploads
router.get('/', expressJwt({ secret: process.env.JWT_SECRET }), (req, res) => {
  const { document_type } = req.query;
  if (![ 'resume', 'coverletter', 'userphoto', 'companyphoto' ].includes(document_type)) {
    return response.sendError(res, response.buildParamError('Invalid param document_type: must be resume, coverletter, userphoto, or companyphoto'));
  }
  const fileName = `${req.user.id}${document_type}.pdf`;
  handleS3Request(req, res, fileName);
});

module.exports = router;

function handleS3Request(req, res, fileName) {
  getSignedUrl(fileName, req.query.contentType, (signedUrl) => {
    if (signedUrl) {
      const data = {
        signedUrl,
        fileName,
      };
      console.log('handle', data);
      return response.sendSuccess(res, response.buildSuccess('Retrieved signed url', data));
    }
    return response.sendError(res, response.buildParamError('Could not retrieve signed url'));
  });
}
