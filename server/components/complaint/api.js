const express = require('express');
const router = express.Router();
const complainController = require('./controller');

router
  .get('/complains', complainController.get)
  .get('/complains/:id', complainController.getById)
  .post('/complains', complainController.create)
  .delete('/complains/:id', complainController.delete);

module.exports = router;