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

function getApplicants(cb, id) {
  axios.post('/api/getApplicants', id, {headers: {Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
}

function getCompanyJobs(cb, idCompany) {
  axios.post('/api/getCompanyJobs', idCompany, {headers: {Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
}

function getRecruiterChats(cb) {
  axios.post('/api/getRecruiterChats', {}, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
}
function getStudentChats(cb) {
  axios.post('/api/getStudentChats', {}, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
}

function getMessages(cb, idChat) {
  axios.post('/api/getMessages', {idChat: idChat}, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
}

function replyMessage(cb, idChat, message) {
  axios.post('/api/replyMessage', {idChat: idChat, Message: message}, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
}

function createMessage(cb, idStudent, message) {
  axios.post('/api/createMessage', {StudentID: idStudent, Message: message}, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
}

function apply(cb, idJobs, SupplementaryAs) {
  axios.post('/api/apply', {idJobs: idJobs, SupplementaryAs: SupplementaryAs}, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
}

function deleteCompany(cb, idCompany) {
  axios.post('/api/deleteCompany', {idCompany}, {headers: { Authorization: utils.getAuthToken()} }).then(cb).catch(() => {cb(false); });
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
  getApplicants,
  getCompanyJobs,
  getRecruiterChats,
  getStudentChats,
  getMessages,
  replyMessage,
  createMessage,
  apply,
  deleteCompany,
};
