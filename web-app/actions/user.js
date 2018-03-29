const LOGIN_USER = 'LOGIN_USER';
// const LOG_OUT_USER = 'LOG_OUT_USER'; / Don't need this because we restart the app on log out.

function loginUserAction(user) {
  return {
    user,
    type: LOGIN_USER,
  };
}

module.exports = {
  LOGIN_USER,
  loginUserAction,
}
