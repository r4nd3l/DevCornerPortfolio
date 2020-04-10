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

// var spanText = document.getElementById('tooltip');
// window.onmousemove = function(e){
//   var x = e.clientX,
//       y = e.clientY;
//
//   spanText.style.top = (y + 20) + 'px';
//   spanText.style.left = (x + 20) + 'px';
// }

// var spanText = document.querySelector('#tooltip');
// window.onmousemove = function(e){
//   var x = e.clientX,
//       y = e.clientY;
//
//   spanText.style.top = (y + 20) + 'px';
//   spanText.style.left = (x + 20) + 'px';
// }

// document.addEventListener('DOMContentLoaded', function() {
//   var spanText = document.querySelectorAll('#tooltip');
//   window.onmousemove = function(e){
//     var x = e.clientX,
//     y = e.clientY;
//
//     for (i = 0; i < spanText.length; i++) {
//       spanText[i].style.top = (y + 20) + 'px';
//       spanText[i].style.left = (x + 20) + 'px';
//     }
//   }
// });

function tooltip(){
  var spanText = document.querySelectorAll('#tooltip');
  window.onmousemove = function(e){
    var x = e.clientX,
    y = e.clientY;

    for (i = 0; i < spanText.length; i++) {
      spanText[i].style.top = (y + 20) + 'px';
      spanText[i].style.left = (x + 20) + 'px';
    }
  }
}
















// END
