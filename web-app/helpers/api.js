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

function updateCompanyDetails(company, cb) {
  axios.post('/api/updateCompanyDetails/', company, { headers: { Authorization: utils.getAuthToken() } }).then(cb).catch(() => { cb(false); });
}


function getStudentDetails(cb) {
  axios.get('/api/getStudentDetails', {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function updateStudentDetails(cb, studentDetails) {
  axios.post('/api/updateStudentDetails', studentDetails, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function getJobDetails(id, cb) {
    axios.post(`/api/getJobDetails`, {idJobs: id} ,{ headers: { Authorization: utils.getAuthToken() } }).then(cb).catch(() => { cb(false); });
}

function getEveryJobAndDetail(cb) {
    axios.get(`api/getEveryJobAndDetail`, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function getUniversityList(cb) {
  axios.get('/api/getUniversityList').then(cb).catch(() => { cb(false); });
}

function getMajors(cb) {
  axios.get('/api/getMajors').then(cb).catch(() => { cb(false); });
}

function getDegrees(cb) {
  axios.get('/api/getDegrees').then(cb).catch(() => { cb(false); });
}

function addJobPosting(cb, jobDetails) {
  axios.post('/api/addJobPosting', jobDetails, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function requestRecruiter(cb, EmailID) {
  axios.post('/api/requestRecruiter', EmailID, {headers: {Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function adminAddRecruiter(cb, EmailID) {
  axios.post('/api/adminAddRecruiter', EmailID, {headers: {Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function adminDeleteRecruiter(cb, EmailID) {
  axios.post('/api/adminDeleteRecruiter', EmailID, {headers: {Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
}



module.exports = {
  getCompanyList,
  getUserDetails,
  getCompanyDetails,
  getRecruiters,
  updateCompanyDetails,
  getStudentDetails,
  updateStudentDetails,
  getUniversityList,
  getMajors,
    getEveryJobAndDetail,
    getJobDetails,
  getDegrees,
  addJobPosting,
  requestRecruiter,
  adminAddRecruiter,
  adminDeleteRecruiter,
};
