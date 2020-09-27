const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Course = mongoose.model("Course");

router.post("/createCourse", (req, res) => {
  const name = req.body.name;
  const points = req.body.points;
  console.log("making course");

  if (!name)
    return res.status(422).json({ error: "Please Enter All the Fields" });

  Course.findOne({ name: name })
    .then((course) => {
      if (course)
        return res.status(422).json({
          error: "Course name already exists. Please try with new name",
        });

      const co = new Course({
        name,
        points,
      });

      co.save().then((c) => res.json({ message: "saved successfully" }));
    })
    .catch((err) => console.log(err));
});

router.get("/courses", (req, res) => {
  Course.find()
    .then((courses) => {
      res.json({ courses });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
