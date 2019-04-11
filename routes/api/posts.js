const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
// Validation
const valPost = require("../../validator/post");

//@route GET /api/posts
//@desc get all posts
//@access public

router.get("/", (req, res) => {
  Post.find()
    .sort({ data: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json(err));
});

//@route GET /api/posts/user/:user_id
//@desc get user's posts by user id
//@access public

router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .then(() => {
      Post.find({ user: req.params.user_id })
        .then(posts => res.json(posts))
        .catch(() => res.status(400).json({ "nopostsfound": true }));
    })
    .catch(err => res.status.json({ "noprofilefound": true }));
});

//@route GET /api/posts/:post_id
//@desc get post by post id
//@access public

router.get("/:post_id", (req, res) => {
  Post.findById({ _id: req.params.post_id })
    .then(post => res.json(post))
    .catch(err => res.status(400).json({ nopostfound: true }));
});

//@route POST /api/posts
//@desc Add post from profile
//@access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = valPost(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.photo,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route DELETE /api/posts/:id
//@desc Delete post from profile
//@access private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

module.exports = router;
