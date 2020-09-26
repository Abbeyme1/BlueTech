const mongoose = require("mongoose");

const course = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

mongoose.model("Course", course);
