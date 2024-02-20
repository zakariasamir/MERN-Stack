const fs = require("fs");
const blogs = require("../blogs.json");

const getData = () => {
  return blogs;
};
const addToFile = (posts) => {
  //console.log("hello from modules");
  fs.writeFile("blogs.json", JSON.stringify(posts), (err) => {
    if (err) {
      console.error(err);
    }
  });
};
module.exports = {
  getData,
  addToFile,
};
