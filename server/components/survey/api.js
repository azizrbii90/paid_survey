const express = require('express');
const router = express.Router();
const surveyController = require('./controller');

router
  .get('/surveys', surveyController.get)
  .get('/surveys/:id', surveyController.getById)
  .post('/surveys', surveyController.create)
  .put('/surveys/:id', surveyController.update)
  .delete('/surveys/:id', surveyController.delete);

module.exports = router;