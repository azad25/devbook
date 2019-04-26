const validator = require("validator");
const is_empty = require("./is_empty");

module.exports = validateExperienceInput = data => {
  let errors = {};

  data.title = !is_empty(data.title) ? data.title : "";
  data.company = !is_empty(data.company) ? data.company : "";
  data.location = !is_empty(data.location) ? data.location : "";
  data.from = !is_empty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) errors.title = "Job title is required";
  if (validator.isEmpty(data.company)) errors.company = "Company is required";
  if (validator.isEmpty(data.location)) errors.location = "Company Location is required";
  if (validator.isEmpty(data.from)) errors.from = "From date is required";

  return {
    errors,
    isValid: is_empty(errors)
  };
};
