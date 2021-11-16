const express = require("express");
const passport = require("../middleware/passport");
const authController = require("../controller/auth_controller");
const { forwardAuthenticated, isAdmin } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", isAdmin, (req, res) => res.render("/"));

