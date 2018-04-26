function buildDatabaseError(err) {
  return {
    success: false,
    code: 500,
    message: 'There was an internal server database error',
    sqlMessage: err.sqlMessage,
  };
}

function buildParamError(msg) {
  return {
    success: false,
    code: 400,
    message: msg,
  };
}

function buildSuccess(msg, data) {
  return {
    success: true,
    code: 200,
    message: msg,
    data,
  };
}

function sendError(res, err) {
  return res.status(err.code)
    .json({
      success: 'false',
      message: err.message,
      sqlMessage: err.sqlMessage,
    });
}

function sendSuccess(res, data) {
  return res.status(data.code)
    .json({
      success: 'true',
      message: data.message,
      data: data.data,
    });
}

module.exports = {
  buildDatabaseError,
  buildParamError,
  buildSuccess,
  sendError,
  sendSuccess,
};
