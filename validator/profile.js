const validator = require("validator");
const is_empty = require("./is_empty");

module.exports = validateProfileInput = data => {
  let errors = {};

  data.handle = !is_empty(data.handle) ? data.handle : "";
  data.status = !is_empty(data.status) ? data.status : "";
  data.skills = !is_empty(data.skills) ? data.skills : "";
  data.website = !is_empty(data.website) ? data.website : "";
  data.facebook = !is_empty(data.facebook) ? data.facebook : "";
  data.twitter = !is_empty(data.twitter) ? data.twitter : "";
  data.linkedIn = !is_empty(data.linkedIn) ? data.linkedIn : "";
  data.instagram = !is_empty(data.instagram) ? data.instagram : "";

  if (!validator.isLength(data.handle, { min: 2, max: 30 }))
    errors.handle = "handle must be in between 2 and 40 characters";
  if (validator.isEmpty(data.handle)) errors.handle = "Handle is required";
  if (validator.isEmpty(data.skills)) errors.skills = "Skill required";
  if (validator.isEmpty(data.status)) errors.status = "Status required";
  if (!validator.isEmpty(data.website)) {
    if (!validator.isURL(data.website)) errors.website = "Website in invalid";
  }
  if (validator.isEmpty(data.facebook)) {
    if (validator.isURL(data.facebook)) errors.facebook = "Url in invalid";
  }
  if (validator.isEmpty(data.twitter)) {
    if (validator.isURL(data.twitter)) errors.twitter = "Url in invalid";
  }
  if (validator.isEmpty(data.linkedIn)) {
    if (validator.isURL(data.linkedIn)) errors.linkedIn = "Url in invalid";
  }
  if (validator.isEmpty(data.instagram)) {
    if (validator.isURL(data.instagram)) errors.instagram = "Url in invalid";
  }

  return {
    errors,
    isValid: is_empty(errors)
  };
};
