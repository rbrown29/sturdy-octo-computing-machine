const express = require("express");

const router = express.Router();

const Hike = require("../models/hike.js");

/////////////////////////////////////
// index route and session username
//////////////////////////////
router.get("/", (request, response) => {
  if (request.session.username) {
    Hike.find({}, (error, allHikes) => {
      response.render("hikes/index.ejs", {
        Hike: allHikes,
        username: request.session.username,
      });
    });
  } else {
    response.redirect("/");
  }
  // console.log(error);
  // console.log(allHikes);
});

////////////////////////////////////
// Delete route
//////////////////////////////////
router.delete("/:id", (request, response) => {
  //update database and delete//////////////////////////////
  Hike.findByIdAndRemove(request.params.id, (error, data) => {
    console.log(error);
    console.log(data);
    response.redirect("/hike");
  });
});

//////////////////////////////
///edit route
//////////////////////////////
router.get("/:id/edit", (request, response) => {
  Hike.findById(request.params.id, (error, foundHike) => {
    response.render("hikes/edit.ejs", {
      Hike: foundHike,
    });
  });
});

////////////////////////////////////
// put route
///////////////////////////
router.put("/:id", (request, response) => {
  // Put to the database and redirect/////////////////////////
  Hike.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true },
    (error, updatedModel) => {
      response.redirect("/hike");
    }
  );
});

//////////////////////////////////
// new route
///////////////////
router.get("/new", (request, response) => {
  response.render("hikes/new.ejs");
});
////////////////////////////////
// show route
///////////////////////
router.get("/:id", (request, response) => {
  Hike.findById(request.params.id, (error, foundHike) => {
    response.render("hikes/show.ejs", {
      Hike: foundHike,
    });
  });
});

/////////////////////////////////////////
// Post route
/////////////////////////////
router.post("/", (request, response) => {
  Hike.create(request.body, (error, createdHike) => {
    response.redirect("/hike");
  });
});

////////////////////////////////////////////////////////
// clear data                        //////////////////
///////////////////////////////////////////////////////
router.put("/clear", (request, response) => {
  Hike.remove({}, (error, updatedModel) => {
    response.redirect("/hike");
  });
});

module.exports = router;
