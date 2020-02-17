const passport = require('passport');
const router = require('express').Router();

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

router.get('/',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.render('home.njk');
  }
);


module.exports = router
