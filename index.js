'use strict'

require('dotenv').config()

const date = require('./date')
const externalip = require('externalip');
const mailer = require('./mailer');
const mongoose = require('mongoose');
let currentIP;

mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('DB connection established!');
});
var Schema = mongoose.Schema;
var ipSchema = new Schema({
    "ip": String
});
var IP = mongoose.model('ip', ipSchema);


function checker(){

    
    externalip(function (err, ip) {
        let time = new Date();
        console.log(date.formatDate(time, "dddd h:mmtt d MMM yyyy")+" => "+ip);
        if(currentIP){
            if(ip && (currentIP !== ip)){
                currentIP = ip;
                sendReport();
                IP.update({_id: process.env.id}, {
                    ip: currentIP, 
                }, function(err, numberAffected, rawResponse) {
                   if(err){
                       console.log(err);
                       return;
                   }
                   console.log(numberAffected);
                   console.log(rawResponse);
                })
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