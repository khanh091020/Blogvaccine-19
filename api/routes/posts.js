const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const isAdmin = require("../middleware/isAdmin");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findOne({ username: req.body.username });
    if (post.username === req.body.username || (user && user.isAdmin)) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADMIN GET POST
router.get("/admin-post/:id", isAdmin, async (req, res) => {
  try {
    const post = await Post.find({ isShown: false });
    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET USER POST
router.get("/user-post/:username", async (req, res) => {
  try {
    const post = await Post.find({ username: req.params.username });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const post = await Post.findOne({ _id: req.params.id });
    if (
      !post.isShown &&
      post.username !== req.params.username &&
      !user &&
      !user.isAdmin
    ) {
      return res.status(400).json({ message: "You have not pemission !" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username, isShown: true });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
        isShown: true,
      });
    } else {
      posts = await Post.find({ isShown: true });
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ADMIN ACCEPT POST
router.post("/accept/:id", async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);
    if (!user.isAdmin) {
      return res.status(403).json({ message: "You have not pemission !" });
    }
    const post = await Post.findByIdAndUpdate(req.params.id, { isShown: true });
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
