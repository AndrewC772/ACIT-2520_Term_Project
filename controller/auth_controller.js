let database = require("../database");
const { ensureAuthenticated, forwardAuthenticated } = require("../middleware/checkAuth");
const https = require('https');
const passport = require("../middleware/passport");
const request = require('request');
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

    // function next(res) {   
      // console.log("next triggered")
    // }
  },

  registerSubmit: (req, res) => {
    // implement
    let new_database_id = 0
    for (existing_user of database) {
      if (new_database_id <= existing_user.id){
        new_database_id = existing_user.id + 1
      }
    }
    request('https://api.unsplash.com/photos/random/?client_id=6C3Sb8DdA3n2_vIhdEA_II_ENcwFrFhp3f7wG1acklk', { json: true }, (err, res1, random_image) => {
      if (err) { 
        return console.log(err); 
      } else {
        let profile_image = random_image.urls.thumb
        database.push(
          {
            id: new_database_id,
            name: "",
            role: "user",
            email: req.body.email,
            password: req.body.password,
            reminders: [],
            profile_pic: profile_image
          }
        )
        res.redirect("/reminders")
        console.log(database)
      }
    });

    // if (userModel.findOne(req.body.email) == )
  },
  
  // signUp: (req, res) => {
  //   console.log(req.params.id)
  //   res.render("auth/register")
  // },
};



module.exports = authController;
