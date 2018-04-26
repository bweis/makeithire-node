const router = require('express').Router();
const jobHandler = require('../handlers/job');
const response = require('../util/response');

// Forwards tag info
router.use('/:id/tag/', (req, res, next) => {
  req.jobId = req.params.id;
  next();
}, require('./job_tag'));

router.get('/', async (req, res) => {
  try {
    const data = await jobHandler.getAllJobs();
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await jobHandler.create(req.body);
    console.log(data);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await jobHandler.getById(req.params.id);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const data = await jobHandler.updateById(req.params.id, req.body);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});


router.delete('/:id', (req, res) => {
  console.log('delete');
  res.status(200).json({ status: 'job' });
});

module.exports = router;
