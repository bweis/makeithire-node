import axios from 'axios/index';

function uploadFileToS3Bucket(file, signedURL) {
  axios.put(signedURL, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  uploadFileToS3Bucket,
};
