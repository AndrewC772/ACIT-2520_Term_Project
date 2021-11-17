const express = require("express");
const passport = require("../middleware/passport");
const authController = require("../controller/auth_controller");
const { forwardAuthenticated, isAdmin } = require("../middleware/checkAuth");
const { Store } = require("express-session");

const router = express.Router();

router.get("/", isAdmin, (req, res) => {
    res.render("./admin/admin", {
        user: req.user,
        session: req.session
    });
});

module.exports = router