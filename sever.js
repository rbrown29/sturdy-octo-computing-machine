////////Dependencies//////////////
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const session = require("express-session"); // add session
const morgan = require("morgan"); // add morgan
const cors = require("cors"); // add cors
const ejs = require("ejs");


require('dotenv').config(); // add dotenv

app.set('view engine', 'ejs'); // add ejs

////////////////////////////////////////////
// Database
///////////////////////////////////////////
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hikes';
mongoose.connect(MONGODB_URI , { 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false,
	useCreateIndex: true
});
///////////////////////////////////////////
// DB connection error/success
//////////////////////////////////////////
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
///////////////////////////////////////////////////////

/////////////////////////////////////////////////
// middleware
////////////////////////////////////////////////
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());  
app.use(methodOverride('_method')); 
app.use(session({  // add session
	  secret: "thereIsNoFateButWhatYouMake", 
	  resave: true,
	  saveUninitialized: true
}));
app.use(morgan("dev")); // add morgan
app.use(cors(
	{origin: "http://localhost:3003", credentials: true}
)); // add cors


///////////////////////////////////////////////
// controllers
///////////////////////////////////////////////
const hikeController = require('./controllers/hike.js');
app.use("/hike", hikeController);

const usersController = require('./controllers/users.js');
app.use("/users", usersController);

const sessionsController = require('./controllers/sessions.js');
app.use("/sessions", sessionsController);

/////////////////////////////////////////////////////
// Home page: have user log in or sign up
/////////////////////////////////////////////////////
app.get('/', (request, response) => {  
     response.render("/views/users/home.ejs");
});


///////////////////////////
// log out user session
//////////////////////////
app.get('/logout', (request, response) => { 
	request.session.destroy((error) => {
		if(error){
			console.log(error);
			response.redirect("/");
		} else {
			response.redirect("/");
		}
	});
});

////////////////////////////////////////////
// listener
///////////////////////////////////////////
app.listen(() => console.log( 'Listening on', 'http://localhost:' + PORT));
