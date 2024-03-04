const express = require("express");

const router = express.Router();

const Hike = require("../models/hike.js");

/////////////////////////////////////
// index route and session username
//////////////////////////////
router.get("/", (request, responce) => {
	if(request.session.username) {
    Hike.find({}, (error, allHikes) => {
    	responce.render("hikes/index.ejs", {
		    Hike: allHikes,
		    username: request.session.username

	    });
    });
    } else {
  	responce.redirect("/");
    }
    // console.log(error);
    // console.log(allHikes);
});

////////////////////////////////////
// Delete route
//////////////////////////////////
router.delete("/:id", (request, responce) => {
	//update database and delete//////////////////////////////
	Hike.findByIdAndRemove(request.params.id, (error, data) => {
        console.log(error);
        console.log(data);
        responce.redirect("/hike");
	});
  
});

//////////////////////////////
///edit route
//////////////////////////////
router.get('/:id/edit', (request, responce) => {
    Hike.findById(request.params.id, (error, foundHike) => {
        responce.render('hikes/edit.ejs', {
    	   Hike: foundHike
    		
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
			Hike: foundHike

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

////////////////////////////////////////////////////////
// clear data                        //////////////////
///////////////////////////////////////////////////////
router.put("/clear", (request, responce) => {
    Hike.remove({}, (error, updatedModel) => {
        responce.redirect("/hike");
    });
});



module.exports = router;