const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('find job tag');
  res.status(200).json({ status: 'success' });
});

router.post('/', async (req, res) => {
  console.log('create new job tag');
  res.status(200).json({
    status: 'success',
    jobId: req.jobId,
  });
});

router.get('/:id', (req, res) => {
  console.log('get job tag');
  res.status(200).json({ status: 'success' });
});

router.delete('/:id', (req, res) => {
  console.log('delete job tag');
  res.status(200).json({ status: 'success' });
});

module.exports = router;
