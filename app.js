'use strict';
const express = require('express');
const nunjucks  = require('nunjucks');
const io = require('socket.io');
const http = require('http');
const ctrl = require('./controller.js');

/* Constants */
const PORT = 8081;

var app = express();
var srv = http.createServer(app);
var socket = io(srv);

/* Controller unit */
var controller = new ctrl(socket);

app.use(express.static('./public'));

nunjucks.configure('./public/views', {
  express: app
})

// Routes
app.get('/register', (req, res, next) =>{
  res.render('register.njk')
})
app.get('/apply', (req, res, next) =>{
  res.render('apply.njk')
})

app.use((req, res, next) =>{
  res.render('index.njk')
})

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
