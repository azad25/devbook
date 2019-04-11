const validator = require('validator');
const is_empty = require('./is_empty');

module.exports = validatePostInput = (data) => {
    let errors = {};

    data.text = (!is_empty(data.text)) ? data.text : '';

    if (!validator.isLength(data.text, {min:10, max:300}))
        errors.text = "Post must be in between 10 and 300 characters";

    if (validator.isEmpty(data.text))
        errors.text = "Post is required";

    return {
        errors,
        isValid: is_empty(errors)
    }
}