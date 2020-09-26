const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { JWT_SECRET, API_KEY } = require("../config/keys");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: API_KEY,
    },
  })
);

router.get("/", (req, res) => {
  console.log("testing...");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please Enter All the Fields" });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ error: "User already exists with that email address" });
      }

      // HERE WE WILL START CREATING A USER WITH GIVEN INFO

      // > FIRST WE WILL ENCRPT PASSWORD
      //  AND THEN WE WILL CREATE USER
      bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
          name,
          email,
          password: hash,
        });

        user.save().then((user) => {
          res.json({ message: "saved successfully" });
        });
      });
    })
    .catch((error) => console.log(error));
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) res.status(422).json({ error: "Invalid email or password" });

    // now we know user exists
    // we will compare encrypted password with given password by funtion provided by BCRYPT
    bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (match) {
          // const lastLogin = user.lastLogin;
          user.lastLogin = Date.now();
          user.save();
          var token = jwt.sign({ _id: user._id }, JWT_SECRET);
          const { _id, name, email, points, lastLogin } = user;
          res.json({ token, user: { _id, name, email, points, lastLogin } });
        } else res.status(422).json({ error: "Invalid email or password" });
      })
      .catch((error) => console.log(error));
  });
});

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }

    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user)
        return res.status(422).json("User doesn't exists with this email");

      (user.resetToken = token), (user.expireToken = Date.now() + 3600000);

      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "abhy1209120@gmail.com",
          subject: "RESET-PASSWORD",
          html: `<p>YOU REQUESTED FOR PASSWORD RESET</p>
          <h5>click <a href="http://localhost:3000/reset/${token}">here</a> to reset password</h5>
          `,
        });
        return res.json({ message: "Check your email" });
      });
    });
  });
});

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const token = req.body.token;

  User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Oops! Session Expire" });
      }

      bcrypt.hash(newPassword, 12).then((hash) => {
        user.password = hash;
        user.resetToken = undefined;
        user.expireToken = undefined;

        user.save((savedUser) => {
          return res.json({ message: "Successfully updated password" });
        });
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
