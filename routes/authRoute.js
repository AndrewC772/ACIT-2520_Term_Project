const express = require("express");
const passport = require("../middleware/passport");
const authController = require("../controller/auth_controller");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

// can't use the app variable instead we need access to it through express.Router(); instead
// The forwardAuthenticated checks that they are not logged in
// and the next allows you to proceed with next() to res.render("login")
router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));
router.get("/register", forwardAuthenticated, (req, res) => res.render("auth/register"));

router.get("/github", passport.authenticate("github"))

router.get(
  "/github/callback",
  // The "local" tells passport that we want to use local auth with email/password if you use "twitter" this would show a twitter login popup
  passport.authenticate("github", { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/reminders');
  }
);

router.post(
  "/login",
  // The "local" tells passport that we want to use local auth with email/password if you use "twitter" this would show a twitter login popup
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.post(
  "/register",
  // The "local" tells passport that we want to use local auth with email/password if you use "twitter" this would show a twitter login popup
  authController.registerSubmit
);


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;

/* This isn't necessary if you use passport and can't mess it up as bad */

// router.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
// });

// first figure out whether you talk to Our database or github
// Talk to the database
// Step 2, redirect back to login page if no user is found
// Create a session of a user is found