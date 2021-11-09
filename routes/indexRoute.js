const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { ensureAuthenticated } = require("../middleware/checkAuth");
const reminderController = require("../controller/reminder_controller")
let database = require("../database");

const router = express.Router();

// can't use the app variable instead we need access to it through express.Router(); instead
// The forwardAuthenticated checks that they are not logged in
// and the next allows you to proceed with next() to res.render("login")
router.get("/", forwardAuthenticated, (req, res) => res.render("/"));

// Routes start here
router.get("/reminders", ensureAuthenticated, reminderController.list);

router.get("/reminder/new", ensureAuthenticated, reminderController.new);

router.get("/reminder/:id/:id2", ensureAuthenticated, reminderController.listOne);

router.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

router.post("/reminder/", ensureAuthenticated, reminderController.create);

router.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

router.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);


module.exports = router;
