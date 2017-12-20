const mailer = require('nodemailer');
const date = require('./date')
const externalip = require('externalip');

function checker(){
    
    
    externalip(function (err, ip) {
        let time = new Date();
        console.log(date.formatDate(time, "dddd h:mmtt d MMM yyyy")+" => "+ip);
      });
    setTimeout(checker, 1000);
}



function main(){
    setTimeout(checker, 1000);
}

main();