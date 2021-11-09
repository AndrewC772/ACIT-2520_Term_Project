let database = require("../database");
const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    console.log("loginSubmit triggered")
    router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));
    console.log("loginsubmit triggered")
    router.post(
      "/login",
      // The "local" tells passport that we want to use local auth with email/password if you use "twitter" this would show a twitter login popup
      passport.authenticate("local", {
        successRedirect: "/reminder",
        failureRedirect: "/login",
      })
    );
  },

  registerSubmit: (req, res) => {
    router.get("/register", forwardAuthenticated, (req, res) => res.render("auth/register"));
    router.post(
      "/login",
      // The "local" tells passport that we want to use local auth with email/password if you use "twitter" this would show a twitter login popup
      passport.authenticate("local", {
        successRedirect: "/reminder",
        failureRedirect: "/login",
      })
    );
  },
};

module.exports = authController;
