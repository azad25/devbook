const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const secret = require("../../config/keys").secretOrKey;

const User = require("../../models/User");

const valReg = require("../../validator/register");
const valLogin = require("../../validator/login");

//@route POST /api/users/register
//@desc register user
//@access public

router.post("/register", (req, res) => {
  const { errors, isValid } = valReg(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(data => {
    if (data) {
      errors.email = "Email already exists";
      res.status(400).json(errors);
    } else {
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(404).json(err));
        });
      });
    }
  });
});

//@route POST /api/users/login
//@desc register user
//@access public

router.post("/login", (req, res) => {
  const { errors, isValid } = valLogin(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(data => {
    if (!data) {
      errors.email = "User not found";
      res.status(404).json(errors);
    } else {
      bcrypt
        .compare(password, data.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: data.id,
              name: data.name,
              email: data.email,
              photo: data.photo
            };

            // sign token
            jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            });
          } else {
            errors.password = "Password Incorrect";
            res.status(400).json(erros);
          }
        })
        .catch(err => {
          errors.notfound = "not found error";
          res.status(404).json(errors);
        });
    }
  });
});

//@route GET /api/users/current
//@desc get current user
//@access private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      photo: req.user.photo
    });
  }
);

module.exports = router;
