var http = require('http');
var express = require('express');
var app = express();

var twiml = require('twilio').twiml;
var bodyParser = require('body-parser');

// for parsing incoming http requests (SMS/Voice)
app.use(bodyParser());

// serve current directory's files
app.use(express.static(__dirname + '/'));
app.get('/', function (req, res){
  res.sendFile('./index.html');
});

// route for incoming SMS (specified in TwiML App settings)
app.post('/', function (req, res) {

  // block returning voters
  var from = req.body.From;
  if (voters.includes(from)){
    console.log('repeat voter');
    return;
  } else {
    voters.push(from);
    console.log(from);
  }

  // send SMS response
  var response = new twiml.MessagingResponse();
  response.message('Thank you for voting!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(response.toString());

  // process received text message
  var msg = req.body.Body.trim();
  io.emit('vote', msg);
  if (votes.hasOwnProperty(msg)){
    votes[msg]++;
    console.log(votes);
  }
});

// route for incoming voice calls (specified in TwiML App settings)
app.post('/call', function (req, res){
  var response = new twiml.VoiceResponse();

  // reject call. you can also respond with TTS or audio file but
  // this will count toward your twilio usage
  response.reject();
  // response.say('Hello World');
  // response.play('https://api.twilio.com/Cowbell.mp3');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(response.toString());
});

// start server on port 3000
var server = http.createServer(app);
server.listen(3000, function () {
  console.log('Express server listening on port 3000');
});

// socket server for communicating with index.html
var io = require('socket.io')(server);
io.on('connection', function (socket){
  console.log('new socket connection:', socket.id);
  io.emit('init', votes);
});

// store votes here in case index.html gets refreshed
var votes = {
  '1': 0,
  '2': 0,
  '3': 0
};

// to keep track of returning voters
var voters = [];
