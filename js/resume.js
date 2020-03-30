(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict



// scroll to top
$(document).ready(function(){
  $(window).scroll(function(){
    if($(this).scrollTop() > 40){
      $('#topBtn').fadeIn();
    } else{
      $('#topBtn').fadeOut();
    }
  });

  $("#topBtn").click(function(){
    $('html ,body').animate({scrollTop : 0},500);
  });
});


// fetch all the personal content
// "use strict";
//
// var myInit = {method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               mode: 'cors',
//               cache: 'default' };
//
// let myRequest = new Request('https://r4nd3l.github.io/DevCornerPortfolio/profile_content.json', myInit);
//
// fetch(myRequest)
//   .then(function(resp){
//     return resp.json();
//   });
//   .then(function(data){
//     console.log(data.profileContent);
//   });


















// END
