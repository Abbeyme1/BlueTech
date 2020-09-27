const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  enrolledCourses: {
    completed: [
      {
        type: ObjectId,
        ref: "Enroll",
      },
    ],
    attempted: [
      {
        type: ObjectId,
        ref: "Enroll",
      },
    ],
    todo: [
      {
        type: ObjectId,
        ref: "Enroll",
      },
    ],
  },

  resetToken: String,
  expireToken: Date,
});

mongoose.model("User", UserSchema);
