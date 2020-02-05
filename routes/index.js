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
    (req, res) => {
      res.render('home.njk')
    }
  );
  router.post('/',
    passport.authenticate(
      'local',
      {
        successRedirect: '/home',
        failureRedirect: '/'
      }
    ),
    (req, res) => {
      console.log('login success');
      res.render('home.njk');
    }
  );
  return router;
};