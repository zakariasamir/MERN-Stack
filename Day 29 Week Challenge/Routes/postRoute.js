const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { getAllPosts, getPostByTitle, createPost, updatePost, deletePost } =
  postController;
const isAdmin = require("../middleware/authMiddleware");

router.get("/", getAllPosts);
router.get("/:title", getPostByTitle);
router.post("/", isAdmin, createPost);
router.put("/:Title", isAdmin, updatePost);
router.delete("/:Title", isAdmin, deletePost);
module.exports = router;
