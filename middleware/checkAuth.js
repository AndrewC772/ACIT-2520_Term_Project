module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) { // the req.isAuthenticated() is given by passport 
      return next(); // returns true if they are logged in next allows the next code to run
    } // if this req.isAuthenticated() is false res.redirect auth/login
    res.redirect("/auth/login");
  },
  // If the user is not logged in they can proceed to next
  forwardAuthenticated: function (req, res, next) {
    console.log("The authentication before it triggered")
    if (!req.isAuthenticated()) {
      console.log("The authentication check triggered")
      return next();
    }
    res.redirect("/reminders");
  },
};
