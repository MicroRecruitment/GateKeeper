const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const JWT_SECRET = require('../env.json').JWT_SECRET;

module.exports = (controller) => {
  let opts = {}
  let cookie_extractor = function(req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  };

  opts.jwtFromRequest = cookie_extractor;
  opts.secretOrKey = JWT_SECRET;
  
  /* Local strategy */
  passport.use('login',
    new LocalStrategy((username, password, done) => {
      let login_data = {
        username: username,
        password: password
      };

      let callback = (data) => {
        if (data.status) {
          done(null, data.result);
        } else {
          done(null, false, "Invalid credentials");
        }
      };
      controller.Login(login_data, callback);
  }));
  
  /* JWT */
  passport.use('jwt',
    new JwtStrategy(opts, function(jwt_payload, done) {
      let callback = function(data) {
        if (data.status) {
          return done(null, data.result);
        } else {
          return done(null, false);
        }
      }
      controller.GetUser(jwt_payload.username, callback);
  }));
}
