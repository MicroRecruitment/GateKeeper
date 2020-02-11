const passport = require('passport');
const router = require('express').Router();
const { Validator } = require('node-input-validator');

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
  const validator = new Validator(req.body,
    {
      name: 'required|integer',
      surname: 'required',
      ssn: 'required',
      email: 'required',
      username: 'required',
      password: 'required|email',
    }
  );
  validator.check().then((matched) => {
    if (!matched) {
      res.status(422).send(validator.errors);
    }
  });
});

module.exports = router
