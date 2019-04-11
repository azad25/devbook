const validator = require("validator");
const is_empty = require("./is_empty");

module.exports = validateEducationInput = data => {
  let errors = {};

  data.school = !is_empty(data.school) ? data.school : "";
  data.degree = !is_empty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !is_empty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !is_empty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) errors.school = "School name is required";
  if (validator.isEmpty(data.degree)) errors.degree = "degree is required";
  if (validator.isEmpty(data.fieldOfStudy))
    errors.fieldOfStudy = "fieldOfStudy is required";
  if (validator.isEmpty(data.from)) errors.from = "from date is required";

  return {
    errors,
    isValid: is_empty(errors)
  };
};
