const express = require('express');
const router = express.Router();
const giftController = require('./controller');

router
  .get('/gifts', giftController.get)
  .get('/gifts/:id', giftController.getById)
  .post('/gifts', giftController.create)
  .put('/gifts/:id', giftController.update)
  .delete('/gifts/:id', giftController.delete);

module.exports = router;