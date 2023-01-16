console.log("working");

$(() => {
	///////////////////////////////////////////////////
	// on click open dialog
	//////////////////////////////////
       $("#open").on("click", (event) => {
         $("#dialog").css("visibility", "visible");
         $(".row").css("visibility", "hidden");
         $(".lbttn").css("visibility", "hidden");
       });
     /////////////////////////////////////////////////////
     // on click close dialog
     //////////////////////////////////
       $(".close").on("click", (event) => {
         $("#dialog").css("visibility", "hidden");
         $(".row").css("visibility", "visible");
         $(".lbttn").css("visibility", "visible");
       });
});
///////////////////////////////////////////////////
// Add event listener to form
///////////////////////////////////////////////////
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();
});

///////////////////////////////////////////////////
// Validate form
///////////////////////////////////////////////////
function validateForm() {
  var password = document.forms["myForm"]["password"].value;
  var userName = document.forms["myForm"]["username"].value;
  if (password.length < 8) {
    alert("Password must be at least 8 characters long");
    document.forms["myForm"]["password"].value = "";
    document.forms["myForm"]["username"].value = "";
    return false;
  }
  if (userName.length === "" || userName.length < 3) {
    alert("Username must be at least 3 characters long");
    document.forms["myForm"]["username"].value = "";
    document.forms["myForm"]["password"].value = "";
    return false;
  }
}