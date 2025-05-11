

  // Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const slides = document.querySelectorAll('.slideshow-background .slide');
    const indicators = document.querySelectorAll('.slide-indicators .indicator');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 seconds per slide
    
    // Function to start the slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Function to reset the interval
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideshow();
    }
    
    // Function to show a specific slide
    function showSlide(n) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Set the current slide and show it
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // Function to show the next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Function to show the previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners for buttons
    prevButton.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });
    
    nextButton.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Initialize the slideshow
    startSlideshow();
    
    // Pause slideshow when user hovers over it
    const heroSection = document.querySelector('.hero-slideshow');
    heroSection.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    // Resume slideshow when user moves away
    heroSection.addEventListener('mouseleave', function() {
        startSlideshow();
    });
    
    // Add animation classes when slide changes
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const heroContent = document.querySelector('.hero-content');
                const animatedElements = heroContent.querySelectorAll('.animate__animated');
                
                animatedElements.forEach(element => {
                    // Reset animation
                    element.classList.remove('animate__fadeInUp');
                    void element.offsetWidth; // Trigger reflow
                    element.classList.add('animate__fadeInUp');
                });
            }
        });
    }, observerOptions);
    
    observer.observe(document.querySelector('.hero-content'));
});