console.log('GMG 1.0');

var socket = io();
var votes = {};

socket.on('vote', function (num){
  console.log(num);
  var elt = document.getElementById(num);

  votes[num]++;
  elt.innerHTML = 'Votes: ' + votes[num];
});

socket.on('init', function (data){
  console.log(data);
  votes = data;

  for (var index in votes){
    var elt = document.getElementById(index);
    elt.innerHTML = 'Votes: ' + votes[index];
  }
});