const nodemailer = require('nodemailer');


async function sendMail(email, code) {
    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASS,
    }});

    return await transporter.sendMail({
        from: process.env.MAILUSER,
        to: email,
        subject: "You called for reset password?",
        html: `
            <div>
                <h3>Hey, this is your code to reset your password!</h3>
                <h1>${code}</h1>
            </div>

        `

    });



}


module.exports = sendMail;