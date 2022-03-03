const express = require('express');
const router = express.Router();
const domainController = require('./controller');

router
  .get('/domains', domainController.get)
  .get('/domains/:id', domainController.getById)
  .post('/domains', domainController.create)
  .put('/domains/:id', domainController.update)
  .delete('/domains/:id', domainController.delete);

module.exports = router;