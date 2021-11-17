const express = require("express");
const passport = require("../middleware/passport");
const userController = require("../controller/userController");
const { isAdmin } = require("../middleware/checkAuth");
const { Store } = require("express-session");

const router = express.Router();

router.get("/", isAdmin, (req, res) => {
    req.sessionStore.all((err, sessions) => {
        if (err) {
            res.render("./admin/admin", {
                user: req.user,
            });
        } else {
            console.log([sessions])
            res.render("./admin/admin", {
                user: req.user,
                sessions: sessions,
            });
    }});
});

router.post("/", (req, res) => {
    console.log(req.body)
})

module.exports = router