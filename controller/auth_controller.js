let database = require("../database");
const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/checkAuth");
const passport = require("../middleware/passport");
let userController = require("./userController")
let userModel = require("../models/userModel")

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
    console.log(req.body)
    let new_database_id = 0
    for (let id of database) {
      if (id > new_database_id ){
        console.log(id, new_database_id)
        new_database_id = id + 1
      }
    }
    database.push(
      {
        id: new_database_id,
        name: "",
        email: req.body.email,
        password: req.body.password,
        reminders: []
      }
    )
    res.redirect("/reminders")
    console.log(database)
    // if (userModel.findOne(req.body.email) == )
  },
  
  // signUp: (req, res) => {
  //   console.log(req.params.id)
  //   res.render("auth/register")
  // },
};

module.exports = authController;
