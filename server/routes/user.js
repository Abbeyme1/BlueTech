const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
const Course = mongoose.model("Course");
const Enroll = mongoose.model("Enroll");

router.post("/getCourse", requireLogin, (req, res) => {
  Course.findOne({ _id: req.body.courseId }).then((course) => {
    if (!course)
      return res.status(401).json({ error: "course doesn't exists" });

    const enrollUser = new Enroll({
      course,
      dueDate: Date.now() + 2592000000,
    });
    console.log(req.user._id);
    User.findOne({ _id: req.user._id }).then((user) => {
      user.enrolledCourses.todo.push({ ...enrollUser });
      user.save().then((result) => res.json(result));
    });
  });
});

module.exports = router;
