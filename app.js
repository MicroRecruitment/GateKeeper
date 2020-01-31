'use strict';
const express = require('express');
const io = require('socket.io');
const http = require('http');
const ctrl = require('./controller.js');

/* Constants */
const PORT = 3000;

var app = express();
var srv = http.createServer(app);
var socket = io(srv);

/* Controller unit */
var controller = new ctrl();

app.use(express.static('./public'));

srv.listen(PORT, function() {
  console.log('Server started on *:' + PORT);
});

/* Setup Socket.io events. */
socket.on('connection', function(client) {
	console.log('Connected Client id: ' + client.id);
	/* Client completed registration. */
  client.on('APPLICANT::REGISTER', function(registration_data) {
    console.log('Gateway (Websocket Event)');
    controller.Register(client.id, registration_data);
  });

  client.on('ADMINISTRATOR::SET', function(percent) {});

  client.on('disconnect', (reason) => console.log(reason));
});
