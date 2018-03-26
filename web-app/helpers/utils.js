function getCookie(name) {
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  if (match) return match[1];
  return '';
}

module.exports = {
  getCookie,
};
