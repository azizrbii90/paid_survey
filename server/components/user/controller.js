'use strict';

const userService = require('./service');
const utils = require('../../utils');

module.exports = {

    register: async (req, res) => {
        try {
            const createUser = req.body;
            createUser.password = await utils.AuthUtils.AuthUtils.argon2Hash(createUser.password)
            const newUser = await userService.create({
                username: createUser.username,
                email: createUser.email,
                password: createUser.password
            })
            const token = await utils.AuthUtils.AuthUtils.generateToken({ id: newUser._id, email: newUser.email}, '1d');
            try {
                await utils.MailService.verificationEmail({
                    email: newUser.email,
                    username: newUser.username,
                    buttonLink: `${req.protocol}://${req.get('host')}/api/users/verify-account?email=${newUser.email}&token=${token}`,
                    type: 'verify your account!'
                })
            } catch (e) {
                res.status(500);
                res.json({ newUser, message: 'error sending email' });
            }
           
            res.status(200);
            res.json(newUser);
        } catch (error) {
            res.status(500);
            res.json(error.message);
        }
    },

    verifyAccount: async (req, res) => {
        try {
            const email = req.query.email
            const token = req.query.token
            const validity = await utils.AuthUtils.AuthUtils.verifyToken(token)
            if(!validity) {
                utils.ErrorHandling.ErrorHandling.createValidationError({
                    type: 'ValidationError',
                    message: 'Verification Link as expired'
                });
            }

            const user = (await userService.get({ email })).data;
            
            if (user.isVerified) {
                utils.ErrorHandling.ErrorHandling.createValidationError({
                    type: 'ValidationError',
                    message: 'Email Already Verified'
                });
            }
            await userService.update(user._id, {
                isVerified: true
            });
            await utils.MailService.welcomeEmail({email:user.email});
            res.status(200);
            res.redirect("URL_HOME_PAGE")
        } catch (error) {
            res.status(400);
            res.json({ updatedUser: null, message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const user = await userService.get(req.body);
            const compare = await utils.AuthUtils.AuthUtils.comparePassword(user.data.password,req.body.password);
            const token = await utils.AuthUtils.AuthUtils.generateToken({ id: user.data._id, email: user.data.email}, '1d');
            if(!compare) {
                res.status(400);
                res.json({user: null, token: null, message: 'wrong password'});
            }
            else if (!user.data.isVerified){
                res.status(403);
                res.json({ user: null, token: null, message: 'not verified'})
            }
            else {
                res.status(200);
                res.json({user : user, token: token, message: 'success'})
            }
        } catch (error) {
            res.status(404);
            res.json({error: error, token: null, message: 'user not found'})
        }
    },

    recoverPasswordRequest: async (req, res) => {
        
        try {
            const email = req.params.email
            const user = await userService.get({ email })
            const token = await utils.AuthUtils.AuthUtils.generateToken({ id: user.data._id, email: user.data.email}, '1d');
            try {
                await utils.MailService.verificationEmail({
                    email: user.data.email,
                    username: user.data.username,
                    buttonLink: `${req.protocol}://${req.get('host')}/api/users/recover-password?email=${user.data.email}&token=${token}`,
                    type: 'recover your account!'
                })
            } catch (e) {
                res.status(500);
                res.json({ newUser, message: 'error sending email' });
            }

            res.status(200);
            res.json("email sent")
        } catch (error) {
            res.status(500);
            res.json(error)
        }
    },

    verifyRecoverPasswordRequest: async (req, res) => {

        try {
            const email = req.query.email
            const token = req.query.token
            console.log("test token ",token)
            const user = await userService.get({ email })
            const validity = await utils.AuthUtils.AuthUtils.verifyToken(token)
            if(!validity) {
                utils.ErrorHandling.ErrorHandling.createValidationError({
                    type: 'ValidationError',
                    message: 'Verification Link as expired'
                });
            }

            res.status(200);
            res.cookie("email", user.data.email, { httpOnly: true });
            res.send("<h1>You will be redirected you the recovery page</h1>" + '<script>         setTimeout(function () {  window.location = "URL_RECOVER_PASSWORD_PAGE"; }, 2000)</script>')
        } catch (error) {
            res.status(500);
            res.json(error);
        }
    },

    recoverPassword: async (req, res) => {

        try {
            const { email, password, confirmPassword } = req.body;
            
            if(req.cookies.email !== email) {
                utils.ErrorHandling.ErrorHandling.createValidationError({
                    type: 'ValidationError',
                    message: 'Cant change password!'
                })
            } else if (password !== confirmPassword) {
                    utils.ErrorHandling.ErrorHandling.createValidationError({
                        type: 'ValidationError',
                        message: 'Password and Confirmation password does not match'
                    })
            } else {
                const user = await userService.get({ email })
                var updatedUser = await userService.update(user._id, { password: await utils.AuthUtils.AuthUtils.argon2Hash(password)})
                res.status(200);
                res.json(updatedUser);
            }

        } catch (error) {
            res.status(400);
            res.json({ updatedUser: null, message: 'error updating password' });
        }
    }


















}
