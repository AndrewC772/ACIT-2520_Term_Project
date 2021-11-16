const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const { forwardAuthenticated, ensureAuthenticated } = require("./middleware/checkAuth")



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


app.use((req, res, next) => {
  next();
});

// Routes start here

/* REALLY SHOULD PROBABLY DEFINITELY ADD THESE TO A ROUTES PAGE BUT TOO LAZY FOR NOW*/
// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
// app.get("/register", authController.register);
// app.get("/login", forwardAuthenticated,  authController.login);
// app.post("/login", authController.loginSubmit);
// app.post("/register", authController.registerSubmit);
// for testing have not implemented a button that will trigger this
// app.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/login")
// })

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use(express.static(path.join(__dirname, "public")));
// app.post("/:email", authController.signUp)
// probably should just leave this for now.
app.use("/admin", adminRoute);



app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
