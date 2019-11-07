const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

///////////////////////////
// new sessions route
////////////////////////////
router.get("/new", (request, responce) => {
    responce.render("sessions/new.ejs");
});

//////////////////////
// post route
///////////////////////
router.post("/", (request, responce) => {
  User.findOne({username:request.body.username}, (error, foundUser) => {
      if(foundUser === null) {
      	responce.redirect("/sessions/new");
      } else {
      	const doesPasswordMatch = bcrypt.compareSync(request.body.password, foundUser.password);
      	if (doesPasswordMatch) {
      		request.session.username = foundUser.username;
      		responce.redirect("/hike");

      	} else {
      		responce.redirect("/sessions/new");
      	}
      }
  });
});


module.exports = router;