

var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var slides = document.getElementsByClassName("slide");
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }

  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}

  slides[slideIndex-1].style.display = "block";
  setTimeout(carousel, 5850); // cambia imagen cade 3 segundos

}