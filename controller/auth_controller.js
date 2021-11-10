let database = require("../database");
const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/checkAuth");
const passport = require("../middleware/passport");
let userController = require("./userController")

let authController = {
  login: (req, res) => {
    // console.log("Login page GET works")
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
    // console.log(req.body)
    // console.log(userController.getUserByEmailIdAndPassword(req.body.email, req.body.password))
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res);
  },

  registerSubmit: (req, res) => {
    // implement
    console.log("RegisterSubmit triggered")
  },
};

module.exports = authController;
