var http = require('http');
var path = require('path');
var express = require('express');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require('body-parser');
var io = require('socket.io');
var request = require('request');

var app = express();
app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser());

app.post('/', function (req, res) {
  var msg = req.body.Body.toLowerCase().split(' ');
  console.log(msg);
  switch (msg[0]){
    case 'up':
      camera('move', 'up');
      break;
    case 'down':
      camera('move', 'down');
      break;
    case 'left':
      camera('move', 'left');
      break;
    case 'right':
      camera('move', 'right');
      break;
    case 'yes':
      yes(true);
      break;
    case 'no':
      yes(false);
      break;
    case 'zoom':
      if (msg[1] == 'in'){
        camera('zoom', '9999');
      } else {
        camera('zoom', '0');
      }
  }
});

function camera(action, value){
  request('http://172.22.151.16/axis-cgi/com/ptz.cgi?' + action + '=' + value, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
  });
}

function yes(bool){
  var motions = [];

  if (bool === true){
    motions = ['down','up','down','up','stop'];
  } else {
    motions = ['left','right','left','right','stop'];
  }

  function move(direction, timeout){
    setTimeout(function (){
      camera('move', direction);
    }, timeout);
  }

  for (var i = 0; i < motions.length; i++){
    move(motions[i], i * 700);
  }
}

var server = http.createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket){
  console.log('new socket connection:', socket.id);
});

server.listen(3000, function () {
  console.log('Express server listening on port 3000');
});


// process.stdin.setEncoding('utf-8');
// process.stdin.on('data', function (data){
//   var msg = data.trim().toLowerCase().split(' ');
//   console.log(msg);

//   switch (msg[0]){
//     case 'up':
//       camera('move', 'up');
//       break;
//     case 'down':
//       camera('move', 'down');
//       break;
//     case 'left':
//       camera('move', 'left');
//       break;
//     case 'right':
//       camera('move', 'right');
//       break;
//     case 'yes':
//       yes(true);
//       break;
//     case 'no':
//       yes(false);
//       break;
//     case 'zoom':
//       if (msg[1] == 'in'){
//         camera('zoom', '9999');
//       } else {
//         camera('zoom', '0');
//       }
//   }
// });