const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);

router.post("/login", authController.login, (req, res) => {
  res.json({ message: "Logged in successfully", user: req.user });
});

router.get("/logout", authController.logout);

module.exports = router;
