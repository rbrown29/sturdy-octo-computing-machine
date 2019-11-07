const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/users.js");

///////////////////////////
// new user route
//////////////////////////
router.get("/new", (request, responce) => {
	responce.render("users/new.ejs");
});


////////////////////////////////
// post route
///////////////////////////
router.post("/", (request, responce) => {
	//password encrypt
    request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));

    User.create(request.body, (error, createdUser) => {
    	console.log(request.body);
    	console.log(error);
    	request.session.username = createdUser.username;
        responce.redirect("/hike");
    });
});

module.exports = router;