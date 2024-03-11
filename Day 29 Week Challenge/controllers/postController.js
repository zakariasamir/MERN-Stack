const Posts = require("../modules/post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getPostByTitle = async (req, res) => {
  try {
    const title = req.params;
    const post = await Posts.findOne({ title });
    if (!post) {
      res.status(404).send("Product not found");
      return;
    }
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Posts({ title, content, author: req.user._id });
    await post.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Posts.findOneAndUpdate(
      req.params.title,
      { title, content },
      { new: true }
    );
    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Posts.findOneAndDelete(req.params.title);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
