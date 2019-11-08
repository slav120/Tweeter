
//Function that counts the number of characters in tweet 
// Starts at 140 and decreases to negative 

$(document).ready(function () {


  $("#textarea").on("keyup", function () {

    let counter = 140 - $(this).val().length
    $(".counter").text(counter)

    if (counter < 0) {
      $(".counter").css('color', 'red');
    } 
    
    else {
      $(".counter").css('color', '#545149');
    }
  
  
  })
});