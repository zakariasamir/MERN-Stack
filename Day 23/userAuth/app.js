const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

const users = [
  {
    username: 'alice',
    password: '$2b$10$TUYGPcvsoxfAJaAam/7tR.hz4nfOmY0hXF7N3A75egnOhte84U50q'
  }
];

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });
  console.log(users);
  res.send("Registration successful");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.userId = username;
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid username or password");
  }
});

app.get("/protected", (req, res) => {
  if (req.session.userId) {
    res.send("Welcome to protected route");
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Error logging out");
    } else {
      res.clearCookie("connect.sid");
      res.send("Logout successful");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
