import axios from 'axios/index';
import { getAuthToken } from './utils';

function checkSession(cb) {
  if (!getAuthToken()) {
    cb(false);
  } else {
    axios.get('/api/ping', {
      headers: {
        Authorization: getAuthToken(),
      },
    })
      .then(() => {
        cb(true);
      })
      .catch(() => {
        cb(false);
      });
  }
}

function logOut() {
  document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location = '/login?logout=true';
}

module.exports = {
  checkSession,
  logOut,
};
