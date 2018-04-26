const aws = require('aws-sdk');

const s3 = new aws.S3();

s3.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AKIAJRIBMBJEURDQ472A,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function getSignedUrl(fileName, contentType, cb) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Expires: 100,
    ContentType: contentType,
  };
  s3.getSignedUrl('putObject', params, (err, signedUrl) => {
    if (err) {
      console.log(err);
      cb(false);
    } else {
      cb(signedUrl);
    }
  });
}

module.exports = {
  getSignedUrl,
};
