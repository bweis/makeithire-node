const router = require('express').Router();
const response = require('../util/response');
const expressJwt = require('express-jwt');
const sessionHandler = require('../handlers/session');

// Get a session
router.get('/', expressJwt({ secret: process.env.JWT_SECRET }), async (req, res) => {
  console.log('ping');
  try {
    const data = await sessionHandler.checkSession(req.user.email_address);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

// Login to new session
router.post('/', async (req, res) => {
  try {
    const data = await sessionHandler.createSession(req);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

module.exports = router;
