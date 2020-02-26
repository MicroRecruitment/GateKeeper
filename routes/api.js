const passport = require('passport');
const {Validator} = require('node-input-validator');

/* Home AUTH: JWT */
function CreateRoute(ctrl) {
  const router = require('express').Router();
  
  router.get('/GetAllApplicants/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      if (req.user.ROLE_ID == '1') {
        ctrl.GetAllApplicants(x => {
          res.json(x);
        });
      } else {
        res.send('Permission denied');
      }
  });
  
  router.post('/Apply/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      console.log("Router | /api/Apply/");
      const data = {
        username: req.user.USERNAME,
        comp: JSON.parse(req.body.comp),
        avail: JSON.parse(req.body.avail),
      };
      console.log(data);
      ctrl.Apply(data, x => {
        res.send(x);
      });
  });
  
  router.post('/SetApplicant/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      if (req.user.ROLE_ID == '1') {
        const validator = new Validator(req.body,
          {
            userId: 'required|integer',
            accept: 'required|boolean',
          }
        );
        validator.check().then((matched) => {
          if (!matched) {
            res.status(422).send(v.errors);
          }
          else {
            console.log(req.body);
            const state = req.body.accept == 'true' ? 2 : 3;

            ctrl.SetApplicant(
              {
                id: req.body.userId,
                status: state,
              },
              x => {
                res.send(x);
              }
            );
          }
        });
      } else {
        res.send('Permission denied');
      }
  });
  return router;
}

module.exports = CreateRoute
