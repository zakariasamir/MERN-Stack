const express = require("express");
const router = express.Router();
const blogController = require("../controllers/postController");
const { getAllPosts, getPostById, createPost, editPost, deletePost } = blogController;

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", editPost);
router.delete("/:id", deletePost);
module.exports = router;
