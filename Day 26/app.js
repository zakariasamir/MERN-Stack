const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const db = client.db("mydb");
const collection = db.collection("users");
const PORT = 3000;

async function getData() {
  try {
    await client.connect();
    await collection.insertMany([
      { name: "Arkadian", age: "25" },
      { name: "zakaria", age: "22" },
      { name: "samir", age: "10" },
    ]);
    const users = await collection.find({}).toArray();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error:", error);
  }
}
getData();
app.listen(PORT, () => {
  console.log(`Server is runinng on port ${PORT}`);
});
