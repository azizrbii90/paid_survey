'use strict';

const userService = require('./service');
const utils = require('../../utils');

module.exports = {

    register: async (req, res) => {
        try {
            const email = req.body.email
            const exist = await userService.get({ email })
            if(exist.data!==null)
                throw new Error("Email already exist!")
            if(exist.data===null) {
                const createUser = req.body;
                createUser.password = await utils.AuthUtils.AuthUtils.argon2Hash(createUser.password)
                const newUser = await userService.create({
                username: createUser.username,
                email: createUser.email,
                password: createUser.password,
                type: createUser.type,
                isVerified: createUser.isVerified
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
            res.json({user: newUser, message: 'success'});
            }
            
        } catch (error) {
            res.status(500);
            if(error.message==="Email already exist!")
                res.json({message:"Email already exist!"})
            else 
                res.json({message: "problem"})
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
            
            if (user.isActivated) {
                utils.ErrorHandling.ErrorHandling.createValidationError({
                    type: 'ValidationError',
                    message: 'Email Already Activated'
                });
            }
            await userService.update(user._id, {
                isActivated: true
            });
            await utils.MailService.welcomeEmail({email:user.email});
            res.status(200);
            res.redirect("http://localhost:3000/login")
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
            console.log("useer", user)
            if(!compare) {
                res.status(400);
                res.json({user: null, token: null, message: 'Wrong Password!'});
            }
            else if (!user.data.isActivated){
                res.status(403);
                res.json({ user: null, token: null, message: 'Account Not Activated, check your email!'})
            }
            else if (!user.data.isVerified){
                res.status(403);
                res.json({ user: null, token: null, message: 'Account Not Verified, wait for Admin verification!'})
            }
            else {
                res.status(200);
                res.json({user : user.data, token: token, message: 'success'})
            }
        } catch (error) {
            res.status(404);
            res.json({error: error, token: null, message: 'User Not Found!'})
        }
    },

    recoverPasswordRequest: async (req, res) => {
        
        try {
            const email = req.params.email
            const user = await userService.get({ email })
            if(user.data===null)
            throw new Error("Email Don't Exist!")
            else {
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
                res.json({ newUser, message: 'Error Sending Email' });
            }

            res.status(200);
            res.json({ message:"Check your email to recover your password!" })
            }
        } catch (error) {
            if(error.message==="Email Don't Exist!")
            res.json({message:"Email Don't Exist!"})
            else 
            res.json({message: "There is a Problem"})
        }
    },

    verifyRecoverPasswordRequest: async (req, res) => {

        try {
            const email = req.query.email
            const token = req.query.token
            const user = await userService.get({ email })
            const validity = await utils.AuthUtils.AuthUtils.verifyToken(token)
            if(!validity) {
                utils.ErrorHandling.ErrorHandling.createValidationError({
                    type: 'ValidationError',
                    message: 'Verification Link as expired'
                });
            }

            res.status(200);
            res.cookie("email", user.data.email, { httpOnly: false });
            res.send("<h1>You will be redirected to the recovery page</h1>" + '<script>         setTimeout(function () {  window.location = "http://localhost:3000/recover-password"; }, 2000)</script>')
        } catch (error) {
            res.status(500);
            res.json(error);
        }
    },

    recoverPassword: async (req, res) => {

        try {

            const { email, password, confirmPassword, cookie_email } = req.body;
            
            if(cookie_email !== email) {
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
                var updatedUser = await userService.update(user.data._id, { password: await utils.AuthUtils.AuthUtils.argon2Hash(password)})
                res.status(200);
                res.json({ user: updatedUser, success: true });
            }

        } catch (error) {
            res.status(400);
            res.json({ updatedUser: null, error: error });
        }
    },

    get: async (req, res) => {
        const users = await userService.get(req.query);
        res.status(200);
        res.json(users);
    },

    updateUser: async (req, res) => {
        try {
            const newData = req.body;
            const id = req.params.id;
            const updatedUser = await userService.update(id, newData);
            res.status(200);
            res.json(updatedUser);
        } catch (e) {
            res.status(400);
            res.json({ updatedUser: null, message: 'Updating is Fail' });
        }
    },

    getInfoFromToken: async (req, res) => {

        try {
            let header = req.headers.authorization;
            let arr = header.split(' ');
            let token = arr[1].slice(1, -1);
            const validity = await utils.AuthUtils.AuthUtils.verifyToken(token)
            if(!validity) {
                utils.ErrorHandling.ErrorHandling.createValidationError({
                    type: 'ValidationError',
                    message: 'Verification Link as expired'
                });
            }
            const email = validity.email
            const user = await userService.get({ email })
            res.status(200);
            res.json({user : user.data, token: token, message: 'success'})
        
        } catch(error) {
            res.status(500);
            res.json(error);
        }

    },

    delete: async (req, res) => {
        const deletedUser = await userService.delete(req.params.id);
        res.status(200);
        res.json(deletedUser);
    },

    changePassword: async (req, res) => {
        try {
            const id = req.params.id
            const { currentPassword, newPassword } = req.body
            var updatedUser = null
            const user = await userService.get({ id })
            const passwordVerification = await utils.AuthUtils.AuthUtils.comparePassword(user.data.password, currentPassword)
            if (!passwordVerification) {
                res.status(404)
                utils.ErrorHandling.ErrorHandling.createValidationError({
                    message: 'Wrong Current Password'
                })
            } else if (passwordVerification && currentPassword === newPassword) {
                utils.ErrorHandling.ErrorHandling.createValidationError({
                    message: 'Please enter a different password'
                })
            } else {
                updatedUser = await userService.updatePassword(user.data._id, {
                    password: await utils.AuthUtils.AuthUtils.argon2Hash(newPassword)
                })
            }
            // todo - send mail to notify user that password has changed
            //await utils.MailService.changePasswordEmail(user.data[0].email)
            res.status(200);
            res.json(updatedUser);
        } catch (e) {
            let message = ''
            if(e.message!=='Wrong Current Password')
                message = 'Error updating password'
            else message = e.message
            res.status(400);
            res.json({ updatedUser: null, message: message });
        }
    }

}
