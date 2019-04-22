const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProfileSchema = mongoose.model(
  'profiles',
  new schema({
    user: {
      type: schema.Types.ObjectId,
      ref: 'users'
    },
    photo: {
      image: Buffer,
      contentType: String,
      path: String
    },
    handle: {
      type: String,
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
    },
    skills: {
      type: [String]
    },
    bio: {
      type: String
    },
    githubUsername: {
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
    education: [
      {
        school: {
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
    social: {
      facebook: {
        type: String
      },
      twitter: {
        type: String
      },
      linkedIn: {
        type: String
      },
      instagram: {
        type: String
      }
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
);

module.exports = ProfileSchema;
