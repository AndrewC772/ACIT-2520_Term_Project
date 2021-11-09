const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

// can't use the app variable instead we need access to it through express.Router(); instead
// The forwardAuthenticated checks that they are not logged in
// and the next allows you to proceed with next() to res.render("login")
router.get("/login", forwardAuthenticated, (req, res) => res.render("/auth/login"));

router.post(
  "/login",
  // The "local" tells passport that we want to use local auth with email/password if you use "twitter" this would show a twitter login popup
  passport.authenticate("local", {
    successRedirect: "/reminder/index",
    failureRedirect: "/auth/login",
  })
);

/* This crap isn't necessary if you use passport and can't fuck it up as bad */

// router.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
// });

// first figure out whether you talk to Our database or github
// Talk to the database
// Step 2, redirect back to login page if no user is found
// Create a session of a user is found

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
