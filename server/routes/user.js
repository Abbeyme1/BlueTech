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
            points: course.points,
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

    .then((user) => {
      return res.json(user);
    })
    .catch((err) => console.log(err));
});

router.post("/unenroll", requireLogin, (req, res) => {
  const courseID = req.body.courseId;
  User.findOne({ _id: req.user._id })
    .then((user) => {
      for (var i = 0; i < user.allCourses.length; i++) {
        var course = user.allCourses[i];
        if (course._id == courseID) {
          user.allCourses.splice(i, 1);
        } else {
          continue;
        }
      }

      for (var i = 0; i < user.attempted.length; i++) {
        var course = user.attempted[i];
        if (course._id == courseID) {
          user.attempted.splice(i, 1);
        } else {
          continue;
        }
      }

      for (var i = 0; i < user.todo.length; i++) {
        var course = user.todo[i];
        if (course._id == courseID) {
          user.todo.splice(i, 1);
        } else {
          continue;
        }
      }

      user.save();

      return res.json(null);
    })
    .catch((err) => res.status(422).json({ error: err }));
});

router.post("/shift", requireLogin, (req, res) => {
  const to = req.body.to;
  const from = req.body.from;
  const courseID = req.body.courseId;

  console.log(to, from, courseID);

  User.findOne({ _id: req.user._id }).then((user) => {
    var shift;
    switch (from) {
      case "todo": {
        for (var i = 0; i < user.todo.length; i++) {
          var course = user.todo[i];
          if (course._id == courseID) {
            shift = course;
            user.todo.splice(i, 1);
          } else {
            continue;
          }
        }
      }

      case "attempted": {
        for (var i = 0; i < user.attempted.length; i++) {
          var course = user.attempted[i];
          if (course._id == courseID) {
            shift = course;
            user.attempted.splice(i, 1);
          } else {
            continue;
          }
        }
      }
    }

    if (to == "attempted") {
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { attempted: shift } },
        { new: true }
      )
        .select("-password")
        .then((result) => res.json(result))
        .catch((err) => res.status(422).json({ error: err }));
    } else if (to == "completed") {
      console.log("Shift is", shift);
      user.points += shift.points;
      shift.dueDate = Date.now();
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { completed: shift } },

        { new: true }
      )
        .select("-password")
        .then((result) => {
          result.points = user.points;

          user.save();
          res.json(result);
        })
        .catch((err) => res.status(422).json({ error: err }));
    }
    user.save();
  });
});

module.exports = router;

//2592000000
