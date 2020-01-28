'use strict';
const express = require('express');
const io = require('socket.io');
const http = require('http');

const ctrl = require('./controller.js');

var app = express();
var srv = http.createServer(app);
var socket = io(srv);
const PORT = Math.round(Math.random() * 40000);

app.use(express.static('./public'));
var controller = new ctrl();

srv.listen(PORT, function(){
  console.log('Server started on *:' + PORT);
});

socket.on('connection', function(client) {
  client.on('APPLICANT::COMPLETE', function(data) {
    controller.Applicant(data);
  });

  client.on('ADMINISTRATOR::SET', function(percent) {
  });

  client.on('disconnect', (reason) => console.log(reason));
});

setInterval(function() {
  controller.Applicant(10);
}, 1000);
