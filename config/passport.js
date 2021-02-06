var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function(User) {
      if (!User) {
        return done(null, false, {
          message: "Not valid username"
        });
      }
      else if (!User.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, circle_db);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
