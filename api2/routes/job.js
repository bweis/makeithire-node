const router = require('express').Router();

// Forwards tag info
router.use('/:id/tag/', (req, res, next) => {
  req.jobId = req.params.id;
  next();
}, require('./job_tag'));

router.get('/', (req, res) => {
  console.log('find');
  res.status(200).json({ status: 'job' });
});

router.post('/', async (req, res) => {
  console.log('find');
  res.status(200).json({ status: 'job' });
});

router.get('/:id', (req, res) => {
  console.log('get');
  res.status(200).json({ status: 'job' });
});

router.patch('/:id', (req, res) => {
  console.log('patch');
  res.status(200).json({ status: 'job' });
});


router.delete('/:id', (req, res) => {
  console.log('delete');
  res.status(200).json({ status: 'job' });
});

module.exports = router;
