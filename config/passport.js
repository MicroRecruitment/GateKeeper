var LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, controller) => {
  passport.serializeUser(function (user, done) {
    let user_string = JSON.stringify(user);
    done(null, user_string);
  });

  passport.deserializeUser(function (user_string, done) {
    let user = JSON.parse(user_string);
    done(null, user);
  });

  passport.use(new LocalStrategy((username, password, done) => {
    console.log('Gateway Login LocalStrategy');
    let loginData = {
      username: username,
      password: password
    };
    let callback = (data) => {
      console.log('Gateway <- Auth response:');
      console.log(data);
      if (data.status) {
        console.log('Passport: login success');
        done(null, data.result[0]);
      } else {
        console.log('Passport: login failed');
        done(null, false, "Invalid credentials");
      }
    };
    controller.Login(loginData, callback);
  }));
}