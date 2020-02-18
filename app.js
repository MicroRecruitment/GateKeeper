'use strict';
const express = require('express');
const nunjucks  = require('nunjucks');
const io = require('socket.io');
const http = require('http');
const ctrl = require('./controller');
const passport = require('passport');

/* Constants */
const PORT = 8081;

/* Routes */
const app = express();
const srv = http.createServer(app);
const socket = io(srv);

/* Controller unit */
const controller = new ctrl(socket);

/* Middleware */
require('./config/middleware.js')(app);

/* Routes */
app.use('/', require('./routes/')(controller));

/* Passport */
require('./config/passport')(controller);

/* Nunjucks Templates setup */
nunjucks.configure('public/views', {
  express: app
});

/* Start server */
srv.listen(PORT, function() {
  console.log('Server started on *:' + PORT);
});

/* Setup Socket.io events. */
socket.on('connection', function(client) {
	console.log('Connected Client id: ' + client.id);

	/* Client completed registration. */
  client.on('APPLICANT::REGISTER', function(registration_data, cb) {
    console.log('Gateway (Websocket Event)');
    controller.Register(registration_data, cb);
  });

  client.on('ADMINISTRATOR::SET', function(percent) {});

  client.on('disconnect', (reason) => console.log(reason));
});
