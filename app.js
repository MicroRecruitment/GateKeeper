'use strict';
const express = require('express');
const nunjucks  = require('nunjucks');
const io = require('socket.io');
const http = require('http');
const ctrl = require('./controller');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

/* Constants */
const PORT = 8081;

/* Routes */
const routes = require('./routes/');

var app = express();
var srv = http.createServer(app);
var socket = io(srv);

/* Controller unit */
var controller = new ctrl(socket);

/* Application configuration */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({ secret: "iv1201" }));
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use('/', routes(app, passport));

/* Passport */
require('./config/passport')(passport, controller);

/* Nunjucks Templates setup */
nunjucks.configure('public/views', {
  express: app
})

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

  /* Client completed login. */
  client.on('AUTH::LOGIN', function(login_data, cb) {
    console.log('Gateway (Websocket Event: LOGIN)');

    let callback = (data) => {
      console.log('Gateway (Websocket Event: LOGIN) Response');
      console.log(data);
      client.request.login(data.user, () => {
        cb({
          status: true
        });
      });
    };

    controller.Login(login_data, callback);

    return;

    let req = {
      body: login_data
    };
    let res = {
      setHeader: () => {},
      end: () => {}
    };

    passport.authenticate('local', null, null)(req, res, null);

    // console.log(client.request.session);
    controller.Login(login_data, cb);
  });

  client.on('ADMINISTRATOR::SET', function(percent) {});

  client.on('disconnect', (reason) => console.log(reason));
});
