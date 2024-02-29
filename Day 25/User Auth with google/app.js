const express = require("express");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const session = require("express-session");
const app = express();
const users = [];
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "438313810795-t9184h5uh30e9kkjrqa4s5gst7ka3ieq.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      users.push(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/auth/login", (req, res) => {
  res.render("login");
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/profile");
  }
);
app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("profile", { profile: users[0] });
  } else {
    res.redirect("/login");
  }
});
app.get("/auth/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
