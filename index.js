var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const APP_TOKEN = 'EAAHWDazLv2YBAPVgLmSzraG4fiuMO5hL3f2oPExJjwDyShSnzcypqujTxneupocnD7VJSbK6kDhxMcJh8L7t99wbCZARDZCgf1BUIU9z5PyN1jxwz6Xr8tECXaCrAiaAuQet8iIkhJ7YLRIAQsPpS6n18wLkYsnCdGUXROljtcqZAbpWBjG';

var app=express();
app.use(bodyParser.json());

app.listen(3000, function(){
 console.log("El servidor se encuentra en el puerto 3000");
});

app.get('/', function(req, res){
 res.send('Bienvenido al taller');
});

app.get('/webhook', function(req, res){
	console.log(req.query)
 if(req.query['hub.verify_token'] ==='mtteam'){
  res.send(req.query['hub.challenge']);
}else{
 res.send('No tiene acceso a este sitio');
}
});

// app.post('/webhook', function(req,res){
//  var data = req.body;
//  console.log(data);
// });
// SECCION FUNCIONAL PERO CON UN SOLO USUARIO DE FACEBOOK En este caso solo con jHOVANNY

app.post('/webhook', function(req,res){
	var data = req.body;
	if(data.object == 'page'){
		data.entry.forEach(function(pageEntry){
			pageEntry.messaging.forEach(function(messagingEvent){
				if(messagingEvent.message){
					receiveMessage(messagingEvent);
				}
			});
		});
		res.sendStatus(200);
	}
});

function receiveMessage (event) {
var senderID= event.sender.id;
var messageText = event.message.text;

console.log(senderID);
console.log(messageText);
evaluateMessage(senderID,messageText);
}

function evaluateMessage(recipientId,message){
	var finalMessage='';

	if (isContain(message,'hola')){
		finalMessage ='hola soy mezcalino en que te puedo ayudar?';
	}else if (isContain(message,'consultar')){
		finalMessage = 'Disculpa no cuento con registros para consultar';
	}else if (isContain(message,'gracias')){
		finalMessage = 'Por nada';
	}else{
		finalMessage = 'No te entiendo! Hablas español? // I can not undestand you - Do you speak Spanish?';
	
	}
	sendMessageText(recipientId,finalMessage);
}
function sendMessageText(recipientId,message){
var messageData= {
	recipient:{
		id: recipientId
	},
	message:{
		text: message
	}
};
callSendAPI(messageData)
}

function callSendAPI(messageData){
	request({
		uri:'https://graph.facebook.com/v2.10/me/messages',
		qs : {access_token: APP_TOKEN},
		method: 'POST',
		json: messageData
	}, function(error,response,data){
		if (error){
			console.log('no es posible enviar mensaje');
		}else{
			console.log('Mensaje enviado');
		}
	});
}

function isContain(sentence,word){
	return sentence.indexOf(word) >- 1;
}

// FIN DE LA SECCION CON UN USUARIO


