import axios from 'axios/index';
const utils = require('./utils');

function getCompanyList(cb) {
  axios.get('/api/getcompanylist').then(cb).catch(() => { cb(false); });
}

function getUserDetails(cb) {
  axios.get('/api/getuserdetails', { headers: { Authorization: utils.getAuthToken() } }).then(cb).catch(() => { cb(false); });
}
module.exports = {
  getCompanyList,
  getUserDetails,
};
