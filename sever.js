////////Dependencies//////////////
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const session = require("express-session"); // add session


require('dotenv').config();
//// port /////////////////

////////////////////////////////////////////
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
///////////////////////////////////////////

//////////////////////////////////////////
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
///////////////////////////////////////////////////////

/////////////////////////////////////////////////
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({  // add session
	  secret: "thereIsNoFateButWhatYouMake", 
	  resave: false,
	  saveUninitialized: false
}));

// add controllers///////////
const hikeController = require('./controllers/hike.js');
app.use("/hike", hikeController);

const usersController = require('./controllers/users.js');
app.use("/users", usersController);

const sessionsController = require('./controllers/sessions.js');
app.use("/sessions", sessionsController);

/////////////////////////////////////////////////////
// have user log in and redirect
/////////////////////////////////////////////////////
app.get('/', (request, responce) => {   // have user log in or sign up
     responce.render("users/home.ejs");
     // responce.render("hello");
});

// //// set a session /////
// app.get("/set", (request, responce) => {
// 	request.session.username = "Koder"; //new
// 	responce.send("In the strict scientific sense we all feed on death…..even vegetarians.");
// });

// //// Check who is logged in ////////
// app.get("/get", (request, responce) => { //new
//    responce.send(request.session.username); 
// });

///////////////////////////
// log out user session
//////////////////////////
app.get('/logout', (request, responce) => { 
	request.session.destroy((error) => {
		if(error){
			console.log(error);
			responce.redirect("/");
		} else {
			responce.redirect("/");
		}
	});
});

////////////////////////////////////////////
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

console.log(MONGODB_URI);
console.log(PORT);
