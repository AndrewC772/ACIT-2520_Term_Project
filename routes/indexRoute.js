const express = require("express");
const router = express.Router(); 
const { ensureAuthenticated } = require("../middleware/checkAuth");

//----------- Welcome Route --------------//
router.get("/", (req, res) => {
    res.send("welcome");
});

//----------- Dashboard Route ------------//
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
        anme: req.user.name,
    })
});

module.exports = router;