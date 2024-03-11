const passport = require("passport");
const User = require("../modules/user");

exports.signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, role, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = passport.authenticate("local");

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully" });
};

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });
