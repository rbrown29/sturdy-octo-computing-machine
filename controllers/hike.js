const express = require("express");

const router = express.Router();

const Hike = require("../models/hike.js");

// new log entries
// router.get('/seed/newlogs', async (request, responce) => {
//   const newLogs = [
//       {
//         title: "Stardate 3",
//         entry: "Today the crew Broke a button",
//         shipIsBroken: false
//       }, 
//       {
//         title: "Stardate 33",
//         entry: "Data went to the borg",
//         shipIsBroken: false
//       }, 
//       {
//         title: "Stardate 333",
//         entry: "Holodeck malfunction",
//         shipIsBroken: false
//       }
//     ];

//   try {
//     const seedLogs = await Log.create(newLogs);
//     responce.send(seedLogs);
//     responce.redirect("/log");
//   } catch (error) {
//     responce.send(error.message);
//   }
// });

///////////////////////////
// index route
//////////////////////////
router.get("/", (request, responce) => {
	if(request.session.username) {
    Hike.find({}, (error, allHikes) => {
    	responce.render("hikes/index.ejs", {
		    hike: allHikes,
		    username: request.session.username

	    });
    });
    } else {
  	responce.redirect("/");
    }
    console.log(error);
});

////////////////////////////////////
// delete route
//////////////////////////////////
router.delete("/:id", (request, responce) => {
	//update database and delete//////////////////////////////
	Hike.findByIdAndRemove(request.params.id, (error, data) => {
        responce.redirect("/hike");
	});
  
});

//////////////////////////////
///edit route
//////////////////////////////
router.get('/:id/edit', (request, responce) => {
    Hike.findById(request.params.id, (error, foundHike) => {
        responce.render('hikes/edit.ejs', {
    	   hike: foundHike
    		
    	});
    });
});

////////////////////////////////////
// put route
///////////////////////////
router.put("/:id", (request, responce) => {
	// Put to the database and redirect/////////////////////////
	Hike.findByIdAndUpdate(request.params.id, request.body, {new:true}, (error, updatedModel) => {
        responce.redirect("/hike");
	});
});

//////////////////////////////////
// new route
///////////////////
router.get("/new", (request, responce) => {
	responce.render("hikes/new.ejs");

});
////////////////////////////////
// show route
///////////////////////
router.get("/:id", (request, responce) => {
	Hike.findById(request.params.id, (error, foundHike) => {
		responce.render("hikes/show.ejs", {
			hike: foundHike

		});

	});

});

/////////////////////////////////////////
// Post route
/////////////////////////////
router.post("/", (request, responce) => {
    Hike.create(request.body, (error, createdHike) => {
    	responce.redirect("/hike");

    });
	

});



module.exports = router;