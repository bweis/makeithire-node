import axios from 'axios/index';
import { getAuthToken } from './utils';

function checkSession(cb) {
  if (!getAuthToken()) {
    cb(false);
  } else {
    axios.get('/api/getSession', {
      headers: {
        Authorization: getAuthToken(),
      },
    })
      .then((res) => {
        cb(res.data.user);
      })
      .catch(() => {
        cb(false);
      });
  }
}

function login(email, password, cb) {
  axios.post('/api/login', { EmailID: email, Password: password })
    .then((res) => {
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
