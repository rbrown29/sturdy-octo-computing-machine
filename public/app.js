console.log("working");

$(() => {
	///////////////////////////////////////////////////
	// on click open dialog
	//////////////////////////////////
       $("#open").on("click", (event) => {
         $("#dialog").css("visibility", "visible");
         $(".row").css("visibility", "hidden");
       });
     /////////////////////////////////////////////////////
     // on click close dialog
     //////////////////////////////////
       $(".close").on("click", (event) => {
         $("#dialog").css("visibility", "hidden");
         $(".row").css("visibility", "visible");
       });
});