const userHandler = require('../handlers/user');
const studentHandler = require('../handlers/student');
const response = require('../util/response');
const router = require('express').Router();

// router.get('/', (req, res) => {
//   console.log('find');
//   res.status(200).json({ status: 'great user' });
// });

router.post('/', async (req, res) => {
  try {
    const data = await userHandler.create(req.body);
    console.log(data);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await userHandler.getById(req.params.id);
    console.log(data);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.patch('/:id', async (req, res) => {
  console.log('patch');
  try {
    const user = await userHandler.updateById(req.params.id, req.body);
    const student = await studentHandler.updateById(req.params.id, req.body);

    console.log('user', user);
    console.log('student', student);
    Object.assign(user.data, student.data);

    return response.sendSuccess(res, user);
  } catch (err) {
    return response.sendError(res, err);
  }
});

// router.delete('/:id', (req, res) => {
//   console.log('delete');
//   res.status(200).json({ status: 'great company' });
// });

module.exports = router;
