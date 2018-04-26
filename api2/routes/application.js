const router = require('express').Router();
const response = require('../util/response');
const applicationHandler = require('../handlers/application');
const expressJwt = require('express-jwt');

router.get('/', async (req, res) => {
  try {
    const data = await applicationHandler.getAllApplications(req.query);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
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

router.get('/:id', async (req, res) => {
  try {
    const data = await applicationHandler.getById(req.params.id);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const data = await applicationHandler.updateById(req.params.id, req.body);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});
//
// router.delete('/:id', (req, res) => {
//   console.log('delete');
//   res.status(200).json({ status: 'application' });
// });


module.exports = router;
