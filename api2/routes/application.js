const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('find');
  res.status(200).json({ status: 'application' });
});

router.post('/', async (req, res) => {
  console.log('find');
  res.status(200).json({ status: 'application' });
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
