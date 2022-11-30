const nodemailer = require('nodemailer')
const welcomeEmail = require('../../views/welcomeEmail')

module.exports = ({ email }) => {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "email",
                pass: "mot de passe"
            }
        })
        const mailOptions = {
            to: email,
            subject: 'Welcome in Our Plateform',
            html: welcomeEmail()
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res("error");
            } else {
                console.log("Message sent: " + JSON.stringify(info));
                res(info);
            }
        })
    })
}
