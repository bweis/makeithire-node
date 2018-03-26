import axios from 'axios/index';
import { getCookie } from './utils';

function checkSession(cb) {
  axios.get('/api/ping', {
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  })
    .then(() => {
      cb(true);
    })
    .catch(() => {
      cb(false);
    });
}

function logOut() {
  document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

module.exports = {
  checkSession,
  logOut,
}
