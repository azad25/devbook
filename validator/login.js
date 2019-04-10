const validator = require('validator');
const is_empty = require('./is_empty');

module.exports = validateLoginInput = (data) => {
    let errors = {};

    data.email = (!is_empty(data.email)) ? data.email : '';
    data.password = (!is_empty(data.password)) ? data.password : '';

    if (!validator.isEmail(data.email))
        errors.email = "Email is invalid";

    if (validator.isEmpty(data.email))
        errors.email = "Email is required";

    if (validator.isEmpty(data.password))
        errors.password = "Password is required";

    return {
        errors,
        isValid: is_empty(errors)
    }
}