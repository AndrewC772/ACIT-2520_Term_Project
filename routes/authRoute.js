const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { route } = require("./indexroute")

const router = express.Router();

router.get("/login", forwardAuthenticaed, (req, res) => res.render("login"))

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
    })
)