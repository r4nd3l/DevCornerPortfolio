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


// Change grid view to list view at portfolio section
document.getElementById("grid_btn").addEventListener("click", viewFlex);
function viewFlex() {
  document.getElementById('items').style.cssText = `
    display: flex;
  `
  document.getElementById('list_btn').classList.remove("active");
  document.getElementById('grid_btn').classList.add("active");
  document.getElementById('items').style.animation = "fadeIn 1s";
}

document.getElementById("list_btn").addEventListener("click", viewList);
function viewList() {
  document.getElementById('items').style.cssText = `
    display: grid;
  `
  document.getElementById('grid_btn').classList.remove("active");
  document.getElementById('list_btn').classList.add("active");
  document.getElementById('items').style.animation = "fadeIn 1s";
}

// add and remove grid/list view
document.getElementById("grid_btn").onmouseover = function() {mouseOver()};
document.getElementById("list_btn").onmouseout = function() {mouseOut()};

function mouseOver() {
  document.getElementById("items").style.animation = "none";
}
function mouseOut() {
  document.getElementById("items").style.animation = "none";
}






















// END
