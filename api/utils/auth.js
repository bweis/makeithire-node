// Verify Token [ Format -> Authorization: <access_token>]
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader;
    next();
  } else {
    res.status(401).send();
  }
}

module.exports = {
  verifyToken,
};
