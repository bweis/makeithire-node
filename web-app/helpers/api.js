import axios from 'axios/index';

const utils = require('./utils');

function getCompanyList(cb) {
  axios.get('/api/getCompanyList').then(cb).catch(() => { cb(false); });
}

function getUserDetails(cb) {
  axios.get('/api/getUserDetails', { headers: { Authorization: utils.getAuthToken() } }).then(cb).catch(() => { cb(false); });
}

function getStudentDetails(cb) {
  axios.get('/api/getStudentDetails', {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function updateStudentDetails(cb, studentDetails) {
  console.log(studentDetails);
  axios.post('/api/updateStudentDetails', studentDetails ,{headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); })
}

function getUniversityList(cb) {

}

function getMajors(cb) {

}

module.exports = {
  getCompanyList,
  getUserDetails,
  getStudentDetails,
  updateStudentDetails,
  getUniversityList,
  getMajors
};
