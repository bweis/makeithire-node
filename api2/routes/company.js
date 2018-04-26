const app = require('express');

const router = app.Router();

// Forwards tag info
router.use('/:id/tag/', (req, res, next) => {
  req.companyId = req.params.id;
  next();
}, require('./company_tag'));

router.get('/', (req, res) => {
  console.log('find company');
  res.status(200).json({ status: 'success' });
});

router.post('/', (req, res) => {
  console.log('post company');
  res.status(200).json({ status: 'success' });
});

router.get('/:id', (req, res) => {
  console.log('get company');
  res.status(200).json({ status: 'success' });
});

router.patch('/:id', (req, res) => {
  console.log('patch company');
  res.status(200).json({ status: 'success' });
});


router.delete('/:id', (req, res) => {
  console.log('delete company');
  res.status(200).json({ status: 'success' });
});

module.exports = router;

