import axios from 'axios/index';
const utils = require('./utils');

function getCompanyList(cb) {
  axios.get('/api/getCompanyList').then(cb).catch(() => { cb(false); });
}

function getUserDetails(cb) {
  axios.get('/api/getUserDetails', { headers: { Authorization: utils.getAuthToken() } } ).then(cb).catch(() => { cb(false); });
}

function getRecruiters(cb, idCompany) {
  axios.post('/api/getRecruiters', {
    headers: {
        Authorization: utils.getAuthToken()
    },
    body: {
      'idCompany': idCompany
    },
    })
      .then(cb).catch(() => { cb(false); });
}
module.exports = {
  getCompanyList,
  getUserDetails,
  getRecruiters
};
