function getCookie(name) {
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : '';
}

function getAuthToken() {
  return getCookie('token') ? `Bearer ${getCookie('token')}` : false;
}

module.exports = {
  getCookie,
  getAuthToken,
};
