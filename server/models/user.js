const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Enroll = new mongoose.Schema({
  _id: {
    type: ObjectId,
    ref: "Course",
  },
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  points: {
    type: Number,
    required: true,
  },
});

mongoose.model("Enroll", Enroll);

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

  allCourses: [Enroll],
  completed: [Enroll],
  attempted: [Enroll],
  todo: [Enroll],
  resetToken: String,
  expireToken: Date,
});

mongoose.model("User", UserSchema);
