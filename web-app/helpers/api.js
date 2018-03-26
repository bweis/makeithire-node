import axios from 'axios/index';

function getCompanyList(cb) {
  axios.get('/api/getCompanyList').then(cb).catch(() => { cb(false); });
}

module.exports = {
  getCompanyList,
};
