const express = require("express");
const app = express();
const blogModule = require("../modules/post");
const { getData, addToFile } = blogModule;
app.use(express.json());
const getAllPosts = async (req, res) => {
  try {
    const blogs = getData();
    res.json(blogs);
  } catch (error) {
    res.json(error);
  }
};
const getPostById = async (req, res) => {
  try {
    const blogs = await getData();
    const post = blogs.find((blog) => blog.id === parseInt(req.params.id));
    if (!post) {
      res.status(404).send("Product not found");
      return;
    }
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};
const createPost = async (req, res) => {
  try {
    const blogs = await getData();
    const id = blogs.length + 1;
    const { title, author, blogBody } = req.body;
    const post = { id, title, author, blogBody };
    blogs.push(post);
    await addToFile(blogs);
    res.json("data added successfully");
  } catch (error) {
    res.json(error);
  }
};

const editPost = async (req, res) => {
  try {
    const blogs = await getData();
    const { title, author, blogBody } = req.body;
    const post = blogs.find((blog) => blog.id === parseInt(req.params.id));
    if (!post) {
      res.status(404).json("Blog not found");
      return;
    }
    const index = blogs.indexOf(post);
    const newPost = { ...post, ...req.body };
    blogs[index] = newPost;
    await addToFile(blogs);
    res.json("blog updated successfully");
  } catch (error) {
    res.send(error);
  }
};
const deletePost = async (req, res) => {
  try {
    const blogs = await getData();
    const index = blogs.findIndex(
      (blog) => blog.id === parseInt(req.params.id)
    );
    if (index === -1) {
      res.status(404).json("Product not found");
      return;
    }
    blogs.splice(index, 1);
    await addToFile(blogs);
    res.json("blog deleted successfully")
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
};
