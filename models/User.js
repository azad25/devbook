const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = mongoose.model('users', new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default:'profile.png'
    },
    date: {
        type: Date,
        default: Date.now
    }
}));

module.exports = UserSchema;