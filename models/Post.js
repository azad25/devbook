const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PostSchema = mongoose.model(
  "posts",
  new schema({
    user: {
      type: schema.Types.ObjectId,
      ref: "users"
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    like: [
      {
        user: {
          type: schema.Types.ObjectId,
          ref: "users"
        }
      }
    ],
    comments: [
      {
        user: {
          type: schema.Types.ObjectId,
          ref: "users"
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        avatar: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  })
);

module.exports = PostSchema;
