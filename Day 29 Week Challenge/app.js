const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./modules/user");
const Post = require("./modules/post");
const authRoutes = require("./Routes/authRoute");
const postRoutes = require("./Routes/postRoute");

const app = express();

async function main() {
  mongoose
    .connect("mongodb://localhost:27017/blog_app")
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.use("/auth", authRoutes);
  app.use("/posts", postRoutes);

  const PORT = 3000;

  app.listen(PORT, console.log(`Server started on port ${PORT}`));
}
main();
