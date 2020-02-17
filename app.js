'use strict';
const express = require('express');
const nunjucks = require('nunjucks');
const http = require('http');
const ctrl = require('./controller');
const passport = require('passport');

/* Constants */
const PORT = 8081;

/* Routes */
const app = express();
const srv = http.createServer(app);

/* Controller unit */
const controller = new ctrl();

/* Middleware */
require('./config/middleware.js')(app);

/* Routes */
app.use('/', require('./routes/'));
app.use('/auth/', require('./routes/auth')(controller));
app.use('/api/', require('./routes/api')(controller));

/* Passport */
require('./config/passport')(controller);

/* Nunjucks Templates setup */
nunjucks.configure('public/views', {
  express: app
});

/* Start server */
srv.listen(PORT, function () {
  console.log('Server started on *:' + PORT);
});

