var VERIFY_TOKEN = 'ateam';
var ACCESS_TOKEN = 'YOUR ACCES TOKEN';
 
 
var express = require('express');
var bodyParser = require('body-parser');
var Botly = require('botly');
var botly = new Botly({
    accessToken: ACCESS_TOKEN,
    verifyToken: VERIFY_TOKEN,
    webHookPath: '/',
    notificationType:  Botly.CONST.REGULAR
});
 
botly.on('message', function (userId, message, data) {
    console.log(data);
    botly.sendText({id: userId , text : 'Hello back from BOT!!!'} , function(error , data)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log('message sent...');
        }
    });
});
 
botly.on("postback", function (userId, message, postback) {
    console.log(postback);
});
 
 
var app = express();
app.use(bodyParser.json());
app.use("/webhook", botly.router());
app.listen(process.env.PORT || 8081);