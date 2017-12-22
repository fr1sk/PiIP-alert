const nodemailer = require('nodemailer');
require('dotenv').config()

let usename = process.env.MAIL;
let password = process.env.PASS;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: usename,
           pass: password
       }
   });

module.exports = {
    sendMail: function(mailOptions){
        transporter.sendMail(mailOptions, (error, info) => {
          console.log(process.env.PASS);
          console.log(process.env.MAIL);
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
      }
}
  
  