const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ProfileSchema = mongoose.model('Profile', new schema({
    user: {
        type: schema.Types(ObjectId),
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skilss: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubUsername: {
        type: String
    },
    linkedinUsername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: {
        school: [
            {
                name: {
                    type: String,
                    required: true
                },
                degree: {
                    type: String,
                    required: true
                },
                fieldOfStudy: {
                    type: String,
                    required: true
                },
                from: {
                    type: Date,
                    required: true
                },
                to: {
                    type: Date
                },
                current: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        college: [
            {
                name: {
                    type: String,
                    required: true
                },
                degree: {
                    type: String,
                    required: true
                },
                fieldOfStudy: {
                    type: String,
                    required: true
                },
                from: {
                    type: Date,
                    required: true
                },
                to: {
                    type: Date
                },
                current: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        university: [
            {
                name: {
                    type: String,
                    required: true
                },
                degree: {
                    type: String,
                    required: true
                },
                fieldOfStudy: {
                    type: String,
                    required: true
                },
                from: {
                    type: Date,
                    required: true
                },
                to: {
                    type: Date
                },
                current: {
                    type: Boolean,
                    default: false
                }
            }
        ],
    },
    social: {
        facebook:{
            type: String,
        },
        Twitter:{
            type: String,
        },
        LinkedIn:{
            type: String,
        },
        Instagram:{
            type: String,
        },
    },
    data: {
        type: Date,
        default: Date.now
    }
}));

module.exports = ProfileSchema;