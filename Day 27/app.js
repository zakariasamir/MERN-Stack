const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
  },
  { timestamps: true }
);
const users = mongoose.model("users", userSchema);
const user = new users({
  name: "Mike Ross",
  email: "mike.ross@arkx.group",
  age: 30,
});
async function addUser() {
  await user
    .save()
    .then(() => {
      console.log("user added successfully");
    })
    .catch((err) => console.log(err));
}
async function getAllUsers() {
  await users
    .find()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
}
async function getUserByNameAndEmail(name, email) {
  await users
    .find({ name: name, email: email })
    .then((user) => {
      console.log(user);
    })
    .catch((err) => console.log(err));
}
async function updateEmail(email, updatedEmail) {
  await users
    .findOneAndUpdate({ email }, { $set: { email: updatedEmail } })
    .then((user) =>
      user
        ? console.log("user Updated Successfully")
        : console.log("user Not Found")
    )
    .catch((err) => console.log(err));
}
async function deleteUsersBeforeDate(date) {
  try {
    const result = await users.deleteMany({ createdAt: { $lt: date } });
    console.log(`${result.deletedCount} users deleted.`);
  } catch (error) {
    console.error("Error deleting users:", error);
  }
}
const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

// addUser();
//getUserByNameAndEmail("zakaria samir", "zakaria.samir@arkx.group");
// updateEmail("hello.world@arkx.group", "zakaria.samir@arkx.group");
// getUserByNameAndEmail("zakaria samir", "zakaria.samir@arkx.group");
//getAllUsers();
deleteUsersBeforeDate(oneWeekAgo);
app.listen(3000);
