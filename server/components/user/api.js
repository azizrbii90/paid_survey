'use strict';

const router = require('express').Router();
const userController = require('./controller');

router
    .post('/users/register',userController.register)
    .post('/users/login',userController.login)
    .get('/users/verify-account',userController.verifyAccount)
    .get('/users/recover-password-request/:email', userController.recoverPasswordRequest)
    .get('/users/recover-password', userController.verifyRecoverPasswordRequest)
    .put('/users/recover-password/:email', userController.recoverPassword)

module.exports = router;
