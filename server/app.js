const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { MONGOURL } = require("./config/keys");

mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

require("./models/user");
require("./models/course");
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/course"));
// app.use(require("./routes/user"));

app.listen(PORT, () => {
  console.log("server starting at port:" + PORT);
});
