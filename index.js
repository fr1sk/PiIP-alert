const mailer = require('nodemailer');
let date = require('./date')

function checker(){
    let time = new Date();
    console.log(date.formatDate(time, "dddd h:mmtt d MMM yyyy")+" => ");
    setTimeout(checker, 1000);
}



function main(){
    setTimeout(checker, 1000);
}

main();