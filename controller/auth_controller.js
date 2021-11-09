let database = require("../database");
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
    console.log("LoginSubmit Triggered")
    res.send("welcome")
    // passport.authenticate("local", {
    //   successRedirect: "/reminders",
    //   failureRedirect: "/login",
    // })
  },

  registerSubmit: (req, res) => {
    // implement
    console.log("RegisterSubmit triggered")
  },
};

module.exports = authController;
