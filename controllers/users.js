const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

///////////////////////////
// new user route
//////////////////////////
router.get("/new", (request, response) => {
  response.render("users/new.ejs");
});

////////////////////////////////
// post route
///////////////////////////
router.post("/", (request, response) => {
  //password encrypt
  request.body.password = bcrypt.hashSync(
    request.body.password,
    bcrypt.genSaltSync(10)
  );

  User.create(request.body, (error, createdUser) => {
    console.log(request.body);
    console.log(error);
    request.session.username = createdUser.username;
    response.redirect("/hike");
  });
});

module.exports = router;
