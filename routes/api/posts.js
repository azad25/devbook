const express = require("express");
const router = express.Router();
const passport = require("passport");

// Model
const Post = require("../../models/Post");
const Profile = require("../../models/profile");
// Validation
const valPost = require("../../validator/post");

//@route GET /api/posts
//@desc get all posts
//@access public

router.get("/", (req, res) => {
  Post.find()
    .sort({ data: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json({ nopostsfound: "No posts found" }));
});

//@route GET /api/posts/user/:user_id
//@desc get user's posts by user id
//@access public

router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .then(() => {
      Post.find({ user: req.params.user_id })
        .then(posts => res.json(posts))
        .catch(() => res.status(400).json({ nopostsfound: true }));
    })
    .catch(err => res.status.json({ noprofilefound: true }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ nopostfound: "No post found with that ID" });
      }
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
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

//@route POST /api/posts/like/:id
//@desc like post
//@access private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.like.filter(x => x.user.toString() === req.user.id).length > 0
          ) {
            return res.status(400).json({ alreadyliked: true });
          }

          post.like.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

//@route POST /api/posts/like/:id
//@desc unlike post
//@access private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.like.filter(x => x.user.toString() === req.user.id).length ===
            0
          ) {
            return res.status(400).json({ nolike: true });
          }

          const index = post.like.map(
            item => item.user.toString() === req.user.id
          );

          post.like.splice(index, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

//@route POST /api/posts/comment/:id
//@desc add post comment
//@access private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = valPost(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          let comment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.photo,
            user: req.user.id
          };
          post.comments.unshift(comment);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ err: true }));
    });
  }
);

// @route DELETE /api/posts/comment/:id/:comment_id
// @desc remove comment from post
// @access private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          // check if user has a comment
          if (
            post.comments.filter(x => x.user.toString() === req.user.id)
              .length === 0
          ) {
            return res.status(400).json({ nousercomment: true });
          }
          // return error
          //check if comment id exists
          if (
            post.comments.filter(
              t => t._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res.status(400).json({ nocomment: true });
          }

          let commentIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
          post.comments.splice(commentIndex, 1);
          //save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

module.exports = router;
