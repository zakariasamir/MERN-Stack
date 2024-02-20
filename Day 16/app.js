const express = require("express");
const http = require("http");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.end("Hello, World!");
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
