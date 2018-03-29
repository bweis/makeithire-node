import axios from 'axios/index';

const utils = require('./utils');

function getCompanyList(cb) {
  axios.get('/api/getCompanyList').then(cb).catch(() => { cb(false); });
}

function getUserDetails(cb) {
  axios.get('/api/getUserDetails', { headers: { Authorization: utils.getAuthToken() } }).then(cb).catch(() => { cb(false); });
}

function getCompanyDetails(id, cb) {
  axios.get(`/api/getCompanyDetails/${id}`, { headers: { Authorization: utils.getAuthToken() } }).then(cb).catch(() => { cb(false); });
}

function getRecruiters(id, cb) {
  axios.get(`/api/getRecruiters/${id}`, { headers: { Authorization: utils.getAuthToken() } }).then(cb).catch(() => { cb(false); });
}

module.exports = {
  getCompanyList,
  getUserDetails,
  getCompanyDetails,
  getRecruiters,
};
