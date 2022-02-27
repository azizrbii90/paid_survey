const nodemailer = require('nodemailer');
const verificationEmail = require('../../views/verificationEmail');


module.exports = ({ email, username, buttonLink, type }) => {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "YOUR_ADDRESS",
                pass: "YOUR_PASSWORD"
            }
        })

        const mailOptions = {
            to: email,
            subject: 'Welcome '+ username +', '+type,
            html: verificationEmail(buttonLink)
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res(error);
            } else {
                console.log("Message sent: " + JSON.stringify(info));
                res(info);
            }
        })
    })
}