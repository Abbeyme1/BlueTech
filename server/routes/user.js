const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
const Course = mongoose.model("Course");
const Enroll = mongoose.model("Enroll");

router.post("/getCourse", requireLogin, (req, res) => {
  const courseID = req.body.courseId;

  User.findByIdAndUpdate(req.user._id)
    .select("allCourses")
    .then((user) => {
      for (var i = 0; i < user.allCourses.length; i++) {
        var course = user.allCourses[i];
        if (course._id == courseID) {
          return res.status(422).json({ error: "Already Enrolled !" });
        }
      }

      Course.findOne({ _id: courseID })
        .then((course) => {
          if (!course)
            return res.status(401).json({ error: "course doesn't exists" });

          const c = new Enroll({
            _id: courseID,
            name: course.name,
            dueDate: Date.now() + 2592000000,
          });

          User.findByIdAndUpdate(
            req.user._id,
            { $push: { allCourses: c, todo: c } },

            { new: true }
          )

            .then((result) => res.json({ message: "added successfully" }))
            .catch((err) => res.status(422).json({ error: err }));
        })
        .catch((err) => console.log(err));
    })

    .catch((err) => console.log(err));
});

router.get("/userDetails", requireLogin, (req, res) => {
  User.findOne({ _id: req.user._id })
    .select("attempted completed todo")
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
