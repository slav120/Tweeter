/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Does't allow you to use javascript in tweet
 const escape = function(str) {
  
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  
  return div.innerHTML;
};




function renderTweets(tweets) {
  
  for (let tweet of tweets) {
    $(".tweet-container").prepend(createTweetElement(tweet));
  
  }
}


function createTweetElement(tweet) {
  const $tweet = ` 
  
<article class="tweet">
  <header>

      <img class="profile-picture" src="${tweet.user.avatars}">
    
      <p class="username">${tweet.user.name}</p>
      <p class="handler">${tweet.user.handle}</p>

  </header>


  <body>
      <p class="tweet-content">${escape(tweet.content.text)}</p>
  </body>
  
<footer>
      
     <p class="date">${moment(new Date(tweet.created_at)).fromNow()}
      </p>
     
      <div class="icon-box">

          <a href="#"><img class="icon" src="/images/flag.png"></a>
          <a href="#"><img class="icon" src="/images/like.png"></a>
          <a href="#"><img class="icon" src="/images/repost.png"></a>
      
       </div>

  </footer>
</article>`;

 
 return $tweet;
}


function validateInput(textInput) {
  
  if (textInput === "") {
    return "You cannot post an empty tweet";
  }
 
   else if (textInput.length > 140) {
    return "Your tweet is too long ! ";
  }
 
  else {
    return false;
  
  }
}

$(function() {
  
 const $button = $("#tweet-button");
  $button.on("click", function(event) {
    $(".error").slideUp();
    event.preventDefault();
    
   let textInput = $("#textarea").serialize();
    let text = textInput.split("=")[1];
    let error = validateInput(text);
   
   if (error) {
      $(".error").text(error);
      $(".error").slideDown();
    } 
   
   else {
      $.ajax("/tweets/", { method: "POST", data: textInput })
        .done(function(data) {
          renderTweets([data])
          $("#textarea").val("");
          $(".counter").text(140);
        })
       
       .error(function() {
          console.log("post tweet error");
        });
    
   }
  });
});

function loadTweet() {
  
 $.ajax("/tweets/", { method: "GET" })
    .done(function(data) {
      renderTweets(data);

    });
}


function toggleBox() {
  
 $(".write-new-tweet").on("click", function() {
    $("#form-write-new-tweet").slideToggle(1000);
  
  });
}


function hideButton() {
  $(window).scroll(function () {
    
   if ($(this).scrollTop() > 0) {
      $(".write-new-tweet").fadeOut();
    } 
   else {
      $(".write-new-tweet").fadeIn();
   
   }
  });
};


function showButton() {
  $("#scrollUp").on("click", function(){
    
    $("#form-write-new-tweet").slideToggle(1000);
    
    $("html, body").animate({
      scrollTop: $("<nav>").offset().top + $('window').height()
    });
  })
  
 
 $(window).scroll(function () {
    
    if ($(this).scrollTop() > 100) {
      $("#scrollUp").fadeIn();
    } 
    
    else {
      $("#scrollUp").fadeOut();
    }
  
 });
};



$(document).ready(function() {
  
 loadTweet();
  toggleBox();
  $("#form-write-new-tweet").hide();
  $(".error").hide();
  hideButton()
  showButton()
  $("#scrollUp").hide()

});
