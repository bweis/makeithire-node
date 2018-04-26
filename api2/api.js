const router = require('express').Router();

// Register Routes Here

router.use('/application/', require('./routes/application'));
router.use('/company/', require('./routes/company'));
router.use('/job/', require('./routes/job'));
router.use('/major/', require('./routes/public/major'));
router.use('/university/', require('./routes/public/university'));
router.use('/user/', require('./routes/user'));

router.get('/', (req, res) => {
  res.status(200).json({ success: true, status: 'online' });
});

router.get('/*', (req, res) => {
  res.status(200).json({ success: false, error: 'invalid api route' });
});

module.exports = router;

