const express = require("express");
const session = require("express-session");
const passport = require("../middleware/passport");
const authController = require("../controller/auth_controller");
const { forwardAuthenticated, isAdmin } = require("../middleware/checkAuth");
const { Store } = require("express-session");

const router = express.Router();

router.get("/", isAdmin, (req, res) => {
    req.sessionStore.all((err, sessions) => {
        if (err) {
            res.render("./admin/admin", {
                user: req.user,
            });
        } else {
            console.log(sessions)
            res.render("./admin/admin", {
                user: req.user,
                sessions: sessions,
            });
    }});
});

module.exports = router