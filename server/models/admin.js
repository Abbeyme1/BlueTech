const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
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
  permission: {
    type: Boolean,
    default: true,
  },
});

mongoose.model("Admin", Admin);
