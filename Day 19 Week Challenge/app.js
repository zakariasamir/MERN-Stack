const express = require("express");
const app = express();
const postRoutes = require("./Routes/postRoutes");
app.use(express.json());
const PORT = 3000;
app.use((req, res, next) => {
  console.log(req.method);
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.use("/blogs", postRoutes);

app.listen(PORT);
