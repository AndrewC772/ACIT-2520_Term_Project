const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const userController = require("../controller/userController");

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    // console.log(email, password, "checked")
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.use(new GitHubStrategy({
  clientID: '02c787d87264dc21c72a',
  clientSecret: '4692683df5026571a0e30e4f6d2a6f52abf1498a',
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(err, user);
  });
}
));


// req.session.passport.user
passport.serializeUser(function (user, done) {
  // console.log(user, "checked")
  done(null, user.id);
}); // req.user

passport.deserializeUser(function (id, done) {
  // console.log(id, "checked")
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
