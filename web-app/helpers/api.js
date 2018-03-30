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
  console.log(studentDetails);
  axios.post('/api/updateStudentDetails', studentDetails ,{headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function getJobDetails(id, cb) {
    axios.post(`/api/getJobDetails`, {idJobs: id} ,{ headers: { Authorization: utils.getAuthToken() } }).then(cb).catch(() => { cb(false); });
}

function getEveryJobAndDetail(cb) {
    axios.get(`api/getEveryJobAndDetail`, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function getUniversityList(cb) {

}

function getMajors(cb) {

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
};
