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
      console.log(req.session);
      res.send(req.user);
    }
  );
  router.post('/',
    passport.authenticate(
      'local'
    ),
    (req, res) => {
      if (req.body.ajax) {
        res.send('login success');
      }
      else res.render('home.njk');
    }
  );
  return router;
};