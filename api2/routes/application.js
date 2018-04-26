const router = require('express').Router();
const response = require('../util/response');
const applicationHandler = require('../handlers/application');
const expressJwt = require('express-jwt');

router.get('/', (req, res) => {
  console.log('find');
  res.status(200).json({ status: 'application' });
});

router.post('/', expressJwt({ secret: process.env.JWT_SECRET }), async (req, res) => {
  try {
    const application_params = req.body;
    application_params.user_id = req.user.id;
    const data = await applicationHandler.create(application_params);
    console.log(data);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.get('/:id', (req, res) => {
  console.log('get');
  res.status(200).json({ status: 'application' });
});

router.patch('/:id', (req, res) => {
  console.log('patch');
  res.status(200).json({ status: 'application' });
});


router.delete('/:id', (req, res) => {
  console.log('delete');
  res.status(200).json({ status: 'application' });
});


module.exports = router;
