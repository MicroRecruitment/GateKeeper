module.exports = (controller) => {
  const passport = require('passport');
  const router = require('express').Router();

  router.get('/',
    passport.authenticate('jwt', {
      session: false,
      failureRedirect: '/login'
    }),
    (req, res) => {
      res.render('home.njk');
    }
  );

  router.get('/login',
    (req, res) => {
      res.render('index.njk')
    }
  );

  router.get('/register',
    (req, res) => {
      res.render('register.njk')
    }
  );

  router.get('/apply',
    (req, res) => {
      res.render('apply.njk')
    }
  );

  router.get('/present',
    (req, res) => {
      res.render('present.njk')
    }
  );

  router.get('/admin',
    passport.authenticate('jwt', {
      session: false,
      failureRedirect: '/login'
    }),
    (req, res) => {
      if (req.user.ROLE_ID == '1') {
        res.render('listApplicants.njk')
      } else {
        res.send('Permission denied');
      }
    }
  );

  router.use('/auth/', require('./auth')(controller));
  router.use('/api/', require('./api')(controller));

  return router;
}
