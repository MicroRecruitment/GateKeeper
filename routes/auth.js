const passport = require('passport');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../env.json').JWT_SECRET;

function CreateRoute(ctrl) {
  const router = require('express').Router();
  
  /* Register */
  router.post('/register',
    (req, res) => {
      let cb = function(result) {
        res.json({
          redirect: '/'
        });
      }
      ctrl.Register(req.body, cb);
  });

  /* Ajax login request to provide JWT. */
  router.post('/login', function (req, res, next) {
    /* Verify function */ 
    let verify = function(error, user, info) {
      if (error || !user) {
        return res.status(400).json({ error });
      }
      
      /* JWT payload */
      const payload = {
        username: user.USERNAME,
        expires: Date.now() + 3000 * 60 * 60,
      };
      
      /* Assigns payload to req.user */
      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({ error });
        }

        const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

        res.cookie('jwt', token, { httpOnly: false, secure: false });
        res.status(200).send({
          redirect: (user.ROLE_ID == '1' ? '/admin' : '/')
        });
      });
    }

    passport.authenticate('login', {session: false}, verify)(req, res, next);
  });

  return router;
}

module.exports = CreateRoute;
