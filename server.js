const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");

// public folder
const app = express();
app.use(express.static(('./public')));

//define routes

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// body parser middleware
app.use(bodyparser.json({ limit: "50mb" }))
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

// app logger
app.use(logger("dev"));

//db config
const db = require("./config/keys").mongoURI;

//mongodb connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("Conncetion error"));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport.js")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
