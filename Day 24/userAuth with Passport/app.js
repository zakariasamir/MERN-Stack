const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const users = [
  {
    id: 1,
    username: "alice",
    password: "$2b$10$TUYGPcvsoxfAJaAam/7tR.hz4nfOmY0hXF7N3A75egnOhte84U50q",
  },
];
passport.use(
  new localStrategy(async (username, password, done) => {
    const user = users.find((user) => user.username === username);
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    try {
      if (!(await bcrypt.compare(password, user.password)))
        return done(null, false, { message: "Incorrect password." });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = users.length + 1;
    users.push({ id, username, password: hashedPassword });
    res.redirect("/login")
  } catch (error) {
    res.send(error);
  }
});
app.get("/login", (req, res)=> {
  res.json({msg: "log in to access the protected route"})
})

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/protected",
    failureRedirect: "/login"
  })
);

app.get("/protected", isAuthenticated, (req, res) => {
  res.json({ msg: "Welcome to protected route" });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ msg: "please login to get access to the protected route" });
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
