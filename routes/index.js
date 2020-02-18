module.exports = (controller) => {
  const auth = require('./auth');
  const jwt = require('jsonwebtoken');
  const passport = require('passport');

  const JWT_SECRET = require('../env.json').JWT_SECRET;
  const router = require('express').Router();
  const { Validator } = require('node-input-validator');

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

  /* Home AUTH: JWT */
  router.get('/home', passport.authenticate('jwt', {session: false}),
    (req, res) => {
      res.render('home.njk');
    }
  );

  /* Ajax login request to provide JWT. */
  router.post('/login', function (req, res, next) {
    /* Verify function */
    let verify = function (error, user, info) {
      if (error || !user) {
        return res.status(400).json({error});
      }

      /* JWT payload */
      const payload = {
        username: user.USERNAME,
        expires: Date.now() + 3000 * 60 * 60,
      };

      /* Assigns payload to req.user */
      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({error});
        }

        const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

        res.cookie('jwt', token, {httpOnly: false, secure: false});
        res.status(200).send(payload);
      });
    }

    passport.authenticate('login', {session: false}, verify)(req, res, next);
  });

  router.post('/register', (req, res) => {
    const validator = new Validator(req.body,
      {
        name: 'required',
        surname: 'required',
        ssn: 'required',
        email: 'required|email',
        username: 'required',
        password: 'required',
      }
    );
    validator.check().then((matched) => {
      if (!matched) {
        res.status(422).send(validator.errors);
      } else {
        const callback = (data) => {
          if (data.status) {
            if(req.body.ajax) {
              res.json({
                status: true,
                redirect: '/',
              });
            }
            else res.redirect('/');
          }
          else {
            res.status(422).json({
              general: {
                message: 'Cannot register user'
              }
            });
          }
        };
        controller.Register(req.body, callback);
      }
    });
  });

  return router;
}
