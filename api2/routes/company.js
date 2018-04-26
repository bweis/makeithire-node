const app = require('express');
const companyHandler = require('../handlers/company');
const response = require('../util/response');

const router = app.Router();

// Forwards tag info
router.use('/:id/tag/', (req, res, next) => {
  req.companyId = req.params.id;
  next();
}, require('./company_tag'));

router.get('/', async (req, res) => {
  try {
    const data = await companyHandler.getAllCompanies(req.query.hasJobs);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await companyHandler.create(req.body);
    console.log(data);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const company = await companyHandler.getById(req.params.id);
    const recruiters = await companyHandler.getAllCompanyRecruiters(req.params.id);

    const data = company;
    data.data[0].recruiters = recruiters.data;
    console.log(data);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const data = await companyHandler.updateById(req.params.id, req.body);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

// router.delete('/:id', (req, res) => {
//   console.log('delete company');
//   res.status(200).json({ status: 'success' });
// });

module.exports = router;

