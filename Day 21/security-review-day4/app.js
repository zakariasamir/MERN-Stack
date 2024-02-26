const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const mongoSanitize = require("express-mongo-sanitize");
const { body, validationResult } = require("express-validator");

const app = express();
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(csurf({ cookie: true }));
app.use(mongoSanitize());
// Routes
app.get("/", (req, res) => {
  res.render("index", { csrfToken: req.csrfToken() });
});

app.post(
  "/login",
  [
    body("username")
      .notEmpty()
      .withMessage("username can't be empty")
      .isLength({ min: 5 })
      .withMessage("username must be at least 5 characters"),
    body("password")
      .notEmpty()
      .withMessage("password can't be empty")
      .isString()
      .isLength({ min: 5, max: 20 })
      .withMessage("password must be between 5 and 20 characters"),
  ],
  (req, res) => {
    // Validate and authenticate the user
    // Implement appropriate validation and secure authentication mechanisms here
    // For simplicity, you can use a hardcoded username and password for demonstration purposes
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
      req.session.isAuthenticated = true;
      res.redirect("/dashboard");
    } else {
      res.redirect("/");
    }
  }
);

app.get("/dashboard", (req, res) => {
  // Secure the dashboard route to only allow authenticated users
  if (req.session.isAuthenticated) {
    res.render("dashboard");
  } else {
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
