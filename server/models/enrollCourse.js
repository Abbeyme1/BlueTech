const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const enrollCourse = new mongoose.Schema({
  course: {
    type: ObjectId,
    ref: "Course",
  },
  dueDate: {
    type: Date,
  },
});

mongoose.model("Enroll", enrollCourse);
