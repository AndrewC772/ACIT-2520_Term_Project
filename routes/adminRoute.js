const express = require("express");
const session = require("express-session");
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
            res.render("./admin/admin", {
                user: req.user,
                sessions: sessions,
            });
    }});
});

router.post("/", (req, res) => {
    console.log(req.body.SessionID)
    req.sessionStore.destroy(req.body.SessionID, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/admin")
        }
    })
})

module.exports = router