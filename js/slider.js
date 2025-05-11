// Image Slideshow Functionality
document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slideshow-slide');
    const prevBtn = document.querySelector('.slideshow-prev');
    const nextBtn = document.querySelector('.slideshow-next');
    let slideInterval;
  
    // Initialize slideshow
    function initSlideshow() {
      if (slides.length === 0) return;
      
      // Hide all slides except the first one
      slides.forEach((slide, index) => {
        if (index !== 0) {
          slide.classList.remove('active');
        } else {
          slide.classList.add('active');
        }
      });
  
      // Start automatic slideshow
      startSlideInterval();
  
      // Add event listeners to buttons
      prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        changeSlide(-1);
        startSlideInterval();
      });
  
      nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        changeSlide(1);
        startSlideInterval();
      });
    }
  
    // Change slides
    function changeSlide(direction) {
      slides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + direction + slides.length) % slides.length;
      slides[slideIndex].classList.add('active');
    }
  
    // Start automatic slideshow
    function startSlideInterval() {
      slideInterval = setInterval(() => {
        changeSlide(1);
      }, 15000); // Change slide every 15 seconds
    }
  
    // Initialize the slideshow
    initSlideshow();
  });