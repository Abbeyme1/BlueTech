const mongoose = require("mongoose");

const course = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

mongoose.model("Course", course);
