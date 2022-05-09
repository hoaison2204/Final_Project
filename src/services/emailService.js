import nodemailer from 'nodemailer';
require('dotenv').config();

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP_ACCOUNT, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Test Email...👻" <sonnhgch18710@fpt.edu.vn>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Information to book a medical appointment", // Subject line
        text: "Hello world?", // plain text body
        html: `<h3>Hello ${dataSend.patientName}!</h3>
        <p>Information to book a medical appointment</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <div>Click here to confirm: <a href=${dataSend.redirectLink} target="_blank">Click here!</a></div>`, // html body

    });
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail
}