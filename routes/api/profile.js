const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// import models
const user = require("../../models/User");
const Profile = require("../../models/Profile");

// import validator
const valProfile = require("../../validator/profile");

//@route GET
//@desc Test route
//@access public

router.use("/test", (req, res) => res.json({ ok: 1 }));

//@route GET
//@desc get current user profile
//@access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        errors.noprofile = "No profile for this user";
        !profile ? res.status(400).json(errors) : res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST
//@desc create or edit profile
//@access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = valProfile(req.body);
    let fields = {};

    if (!isValid) {
      res.status(400).json(errors);
    }

    fields.user = req.user.id;

    if (req.body.handle) fields.handle = req.body.handle;
    if (req.body.company) fields.company = req.body.company;
    if (req.body.website) fields.website = req.body.website;
    if (req.body.bio) fields.bio = req.body.bio;
    if (req.body.location) fields.location = req.body.location;
    if (req.body.status) fields.status = req.body.status;

    if (req.body.skills) {
      if (typeof req.body.skills !== "undefined") {
        fields.skills = req.body.skills.split(",");
      }
    }

    if (req.body.githubusername)
      fields.githubusername = req.body.githubusername;
    if (req.body.linkedinUsername)
      fields.linkedinUsername = req.body.linkedinUsername;

    if (req.body.experience) fields.experience = req.body.experience;
    if (req.body.education) fields.education = req.body.education;

    fields.social = {};

    if (req.body.facebook) fields.social.facebook = req.body.facebook;
    if (req.body.twitter) fields.social.twitter = req.body.twitter;
    if (req.body.linkedIn) fields.social.linkedIn = req.body.linkedIn;
    if (req.body.instagram) fields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: fields },
            { new: true }
          )
            .then(profile => res.json(profile));
        } else {
          Profile.findOne({ handle: req.body.handle })
            .then(profile => {
              if (profile) {
                res.status(400).json({ handle: "Handle already exists" });
              } else {
                new Profile(fields).save().then(profile => res.json(profile));
              }
            })
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;