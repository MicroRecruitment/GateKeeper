const passport = require('passport');


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
  
  router.get('/Apply/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      ctrl.Apply(req.body, x => {
        res.send(x);
      });
  });
  
  router.get('/SetApplicant/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      if (req.user.ROLE_ID == '1') {
        ctrl.SetApplicant(x => {
          res.send(x);
        });
      } else {
        res.send('Permission denied');
      }
  });
  return router;
}

module.exports = CreateRoute
