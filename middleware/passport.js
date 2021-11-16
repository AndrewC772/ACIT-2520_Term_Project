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

const githubLogin = new GitHubStrategy(
  {
    clientID: "3a7cef2895365034f663",
    clientSecret: "cfc4d7dfd92247cb1d8132ca7504d86229a3a5c1",
    callbackURL: "http://localhost:3001/auth/github/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    let user = userController.getUserByGitHubIdOrCreate(profile)
    return done(null, user)
  }
)



// req.session.passport.user
passport.serializeUser(function (user, done) {
  // console.log(user, "checked")
  done(null, user.id);
});

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
module.exports = passport.use(githubLogin);
