const mailer = require('nodemailer');
const date = new Date();

function checker(){
    
    setTimeout(checker, 1000);
}



function main(){
    setTimeout(checker, 1000);
}

main();