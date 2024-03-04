const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const popup = require("alert");

///////////////////////////
// new sessions route
////////////////////////////
router.get("/new", (request, responce) => {
  responce.render("sessions/new.ejs");
});

//////////////////////
// post route
///////////////////////
router.post("/", (request, response) => {
  User.findOne({ username: request.body.username }, (error, foundUser) => {
    if (foundUser === null) {
      console.log("user not found");
      popup("user not found");
      response.redirect("/sessions/new");
    } else {
      const doesPasswordMatch = bcrypt.compareSync(
        request.body.password,
        foundUser.password
      );
      if (doesPasswordMatch) {
        request.session.username = foundUser.username;
        response.redirect("/hike");
      } else {
        console.log("password does not match");
        popup("password does not match");
        response.redirect("/sessions/new");
      }
    }
  });
});

module.exports = router;
