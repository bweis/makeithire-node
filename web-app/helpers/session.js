import axios from 'axios/index';
import { getAuthToken } from './utils';

function checkSession(cb) {
  if (!getAuthToken()) {
    cb(false);
  } else {
    axios.get('/api/session', {
      headers: {
        Authorization: getAuthToken(),
      },
    })
      .then((res) => {
        console.log(res);
        cb(res.data.data.user);
      })
      .catch(() => {
        cb(false);
      });
  }
}

function login(email_address, password, cb) {
  axios.post('/api/session', { email_address, password })
    .then((res) => {
      console.log(res);
      cb(res);
      console.log(res);
    })
    .catch((err) => {
      cb(false);
      console.log(err);
    });
}

function logout() {
  document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location = '/login?logout=true';
}

module.exports = {
  checkSession,
  logout,
  login,
};
