
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../model/user');

module.exports = (app) => {
  app.use(session({
    secret: 'asdfasdfuwidgjsjeqlfskdlfksiwklfkdkfl',
    saveUninitialized: false, // don't create session until something stored,
    resave: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-login',
    new localStrategy({
      usernameField: 'studentId',
      passwordField: 'password',
      passReqToCallback: true,
    }, (req, studentId, password, done) => {
      User.findOne({ studentId }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(user, true);
      });
    }));
};
