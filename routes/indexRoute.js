const express = require("express");
const router = express.Router();
const reminderController = require("../controller/reminder_controller");
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");


// ensureAuthenticated is a middleware function that will check whether
// or not you are logged in and if so you can show
router.get("/reminders", ensureAuthenticated, reminderController.list);

router.get("/reminder/new", ensureAuthenticated, reminderController.new);

router.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

router.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

router.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implement this yourself
router.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

// Implement this yourself
router.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

module.exports = router;
