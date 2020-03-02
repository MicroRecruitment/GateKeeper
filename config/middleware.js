const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const passport = require('passport');
const express = require('express');

function SetupMiddleware(app) {
  /* Application configuration */
  app.use(express.static('public'));
  app.use(body_parser.urlencoded({ extended: false }));
  app.use(body_parser.json());
  app.use(cookie_parser());
  app.use(passport.initialize({}));
}

module.exports = SetupMiddleware;
