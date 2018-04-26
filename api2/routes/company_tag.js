const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('find company tag');
  res.status(200).json({ status: 'success' });
});

router.post('/', async (req, res) => {
  console.log('create new company tag');
  res.status(200).json({
    status: 'success',
    companyId: req.companyId,
  });
});

router.get('/:id', (req, res) => {
  console.log('get company tag');
  res.status(200).json({ status: 'success' });
});

router.delete('/:id', (req, res) => {
  console.log('delete company tag');
  res.status(200).json({ status: 'success' });
});

module.exports = router;
