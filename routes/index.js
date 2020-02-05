const auth = require('./auth');

module.exports = function (app, passport) {
  const router = require('express').Router();
  router.get('/',
    (req, res) => {
      res.render('index.njk')
    }
  );
  router.get('/register',
    (req, res) => {
      res.render('register.njk')
    }
  );
  router.get('/home',
    auth.required,
    (req, res) => {
      res.render('home.njk', {user: req.user});
    }
  );
  router.post('/',
    passport.authenticate('local'),
    (req, res) => {
      if (req.body.ajax) {
        res.json({ redirect: '/home' });
      }
      else res.render('home.njk');
    }
  );

  return router;
};