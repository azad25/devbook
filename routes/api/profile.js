const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// import models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// import validator
const valProfile = require("../../validator/profile");
const valExperience = require("../../validator/experience");
const valEducation = require("../../validator/education");

//@route GET /api/profile/
//@desc get current user profile
//@access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email"])
      .then(profile => {
        errors.noprofile = "No profile for this user";
        !profile ? res.status(400).json(errors) : res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route GET /api/profile/handle/:handle
//@desc get user profile by handle
//@access public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "email"])
    .then(profile => {
      errors.noprofile = "No profile for this user";
      !profile ? res.status(400).json(errors) : res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET /api/profile/user/:user_id
//@desc get user profile by user id
//@access public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "email"])
    .then(profile => {
      errors.noprofile = "No profile for this user";
      !profile ? res.status(400).json(errors) : res.json(profile);
    })
    .catch(err => {
      errors.invalidUser = "Invalid user id";
      res.status(400).json(errors);
    });
});

//@route GET /api/profile/all
//@desc get all profiles
//@access private

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "email"])
    .then(profiles => {
      errors.noprofile = "Currently no profiles";
      !profiles ? res.status(400).json(errors) : res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

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
      .populate("user", ["name", "email"])
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: fields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          Profile.findOne({ handle: req.body.handle })
            .populate("user", ["name", "email"])
            .then(profile => {
              if (profile) {
                errors.handle = "Handle already exists";
                res.status(400).json();
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

//@route DELETE /api/profile/delete
//@desc delete profile and user
//@access private

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

//@route POST /api/profile/experience
//@desc add experience
//@access private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = valExperience(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      let fields = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.experience.unshift(fields);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route DELETE /api/profile/experience/:exp_id
//@desc delete experience
//@access private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const index = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        profile.experience.splice(index, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

//@route POST /api/profile/education
//@desc add education
//@access private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = valEducation(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      let fields = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current
      };

      profile.education.unshift(fields);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route DELETE /api/profile/experience/:exp_id
//@desc delete experience
//@access private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const index = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        profile.education.splice(index, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
