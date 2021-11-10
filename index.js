const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");
const { forwardAuthenticated, ensureAuthenticated } = require("./middleware/checkAuth")

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//middleware
app.use(express.json())
app.use(ejsLayouts);
//
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


// Routes start here

/* REALLY SHOULD PROBABLY DEFINITELY ADD THESE TO A ROUTES PAGE BUT TOO LAZY FOR NOW*/
app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated,  authController.login);
app.post("/login", authController.loginSubmit);
app.post("/register", authController.registerSubmit);
// for testing have not implemented a button that will trigger this
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login")
})
// app.post("/:email", authController.signUp)
// probably should just leave this for now.
// app.get('/', (req, res) => {
//   console.log(req.query.email)
//   let email_entered = req.query.email
//   res.send('id: ' + req.query.email);
// });


app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
