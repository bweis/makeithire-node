const router = require('express').Router();
const response = require('../util/response');
const chatHandler = require('../handlers/chat');
const expressJwt = require('express-jwt');

router.get('/', async (req, res) => {
  try {
    const data = await chatHandler.getChats(req.query);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await chatHandler.create(req.body);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const chat = await chatHandler.getById(req.params.id);
    const messages = await chatHandler.getMessages(req.params.id);

    if (chat.data.length === 0) { // If no result
      return response.sendSuccess(res, chat);
    }

    const data = chat;
    data.data[0].messages = messages.data;
    console.log(data);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});


// Messages
router.post('/:id/message', expressJwt({ secret: process.env.JWT_SECRET }), async (req, res) => {
  try {
    const data = await chatHandler.createMessage(req);
    return response.sendSuccess(res, data);
  } catch (err) {
    return response.sendError(res, err);
  }
});

// router.patch('/:id', (req, res) => {
//   console.log('patch');
//   res.status(200).json({ status: 'chat' });
// });

// router.delete('/:id', (req, res) => {
//   console.log('delete');
//   res.status(200).json({ status: 'chat' });
// });

module.exports = router;
