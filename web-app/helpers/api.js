import axios from 'axios/index';
const utils = require('./utils');

const config = {
  headers: {
    Authorization: utils.getAuthToken()
  }
};

function getCompanyList(cb) {
  axios.get('/api/getCompanyList').then(cb).catch(() => { cb(false); });
}

function getUserDetails(cb) {
  axios.get('/api/getUserDetails', { headers: { Authorization: utils.getAuthToken() } } ).then(cb).catch(() => { cb(false); });
}

function getRecruiters(cb, idCompany) {
  axios.post('/api/getRecruiters', {
    body: {
      'idCompany': idCompany
    },
    }, config)
      .then(cb).catch(() => { cb(false); });
}
module.exports = {
  getCompanyList,
  getUserDetails,
  getRecruiters
};
