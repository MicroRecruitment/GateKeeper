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

router.post('/register', (req, res) => {
  res.status(400).send({
    'name': 'error1',
    'ssn': 'error2',
  });
});

module.exports = router
