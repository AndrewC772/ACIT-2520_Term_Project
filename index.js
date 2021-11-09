const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session")
const path = require("path");
const port = process.env.port || 8081

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
  })
);

const passport = require("./middleware/passport/");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialzie());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);



// Routes start here

app.get("/reminders", reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id/:id2", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
