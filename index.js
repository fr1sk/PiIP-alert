const date = require('./date')
const externalip = require('externalip');
const mailer = require('./mailer');
let currentIP;

function checker(){

    
    externalip(function (err, ip) {
        let time = new Date();
        console.log(date.formatDate(time, "dddd h:mmtt d MMM yyyy")+" => "+ip);
        if(currentIP){
            if(ip && (currentIP !== ip)){
                sendReport(currentIP);
            }
        } 
        if(ip){
            currentIP = ip;
        }
      });
    setTimeout(checker, 1000);
}

function sendReport(){
    const mailOptions = {
        from: process.env.SENDER, 
        to: process.env.RECEIVER, 
        subject: '🔐 DOOR IP ADDRESS CHANGED', 
        html: `<a href="http://${currentIP}">
                    <img src="https://i.imgur.com/ocIFIQA.png" width="200" height="200">
               </a>
               <br>
               <a href="http://${currentIP}">
                    <p>New IP</p>
               </a>`

      };
      mailer.sendMail(mailOptions);
}


function main(){
    setTimeout(checker, 1000);
}


main();