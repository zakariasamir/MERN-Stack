const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const mongoSanitize = require("express-mongo-sanitize");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
function isAuthenticated(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  // Bearer token
  const token = authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  try {
    const user = jwt.verify(token, "secret");
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthenticated" });
  }
}
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
      .withMessage("username must be at least 5 characters")
      .escape(),
    body("password")
      .notEmpty()
      .withMessage("password can't be empty")
      .isString()
      .isLength({ min: 5, max: 20 })
      .withMessage("password must be between 5 and 20 characters")
      .escape(),
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
      const token = jwt.sign({ username: username }, "secret", {
        expiresIn: "20s",
      });
      res.json({ message: "Login Successful", token: token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
);

app.get("/dashboard", isAuthenticated, (req, res) => {
  // Secure the dashboard route to only allow authenticated users
    res.render("dashboard");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
