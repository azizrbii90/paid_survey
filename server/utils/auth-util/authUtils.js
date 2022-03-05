const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

module.exports = {

    async generateToken (params = {}, expireInTime= '1d') {
        return jwt.sign(
            params, 
            "module-auth.register.login.forgetpassowrd.resetpassword",
            {expiresIn: expireInTime}
            )
    },

    async verifyToken (token) {
        return jwt.verify(token, "module-auth.register.login.forgetpassowrd.resetpassword")
    },

   /* async getInfoFromToken (token) {
        jwt.verify(token, "module-auth.register.login.forgetpassowrd.resetpassword", (err, decode) => {
            if (err != null) {
              reject('Session Expired ')
            } else {
              User.findOne({ 'email': decode.email }).then(data => {
                if (data && Object.keys(data).length > 0) {
                  resolve(data);
                } else {
                  reject("User Not Founnd");
                }
              });
            }
          })
    },*/
    
    async argon2Hash (data) {
        return argon2.hash(data)
    },

    async comparePassword (savedPassword, userTypedPassword) {
        return await argon2.verify(savedPassword,userTypedPassword) 
    }
}