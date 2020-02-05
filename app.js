'use strict';
const express = require('express');
const nunjucks  = require('nunjucks');
const io = require('socket.io');
const http = require('http');
const ctrl = require('./controller');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const SQLiteStore = require('connect-sqlite3')(session);

/* Constants */
const PORT = 8081;

/* Routes */
const routes = require('./routes/');

const app = express();
const srv = http.createServer(app);
const socket = io(srv);

/* Controller unit */
const controller = new ctrl(socket);

/* Application configuration */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  store: new SQLiteStore({}),
  secret: 'iv1201',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use('/', routes(app, passport));

/* Passport */
require('./config/passport')(passport, controller);

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
