const express = require('express');
const router = express.Router();
const orderController = require('./controller');

router
  .get('/orders', orderController.get)
  .get('/orders/:id', orderController.getById)
  .post('/orders', orderController.create)
  .put('/orders/:id', orderController.update)
  .delete('/orders/:id', orderController.delete);

module.exports = router;