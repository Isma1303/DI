// JavaScript for index page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Index page loaded successfully!');
    
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (carousel && slides.length > 0) {
      let currentIndex = 0;
      const slideWidth = 100; // Width in percentage
      
      // Initialize carousel
      function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      }
      
      // Add transition effect
      carousel.style.transition = 'transform 0.5s ease-in-out';
      
      // Auto-advance carousel
      let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }, 5000);
      
      // Previous button click
      prevButton.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
        
        // Restart auto-advance
        interval = setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateCarousel();
        }, 5000);
      });
      
      // Next button click
      nextButton.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
        
        // Restart auto-advance
        interval = setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateCarousel();
        }, 5000);
      });
      
      // Add touch/swipe support
      let touchStartX = 0;
      let touchEndX = 0;
      
      carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, false);
      
      carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, false);
      
      function handleSwipe() {
        // Reset interval
        clearInterval(interval);
        
        // Min swipe distance
        const minSwipeDistance = 50;
        
        // Calculate swipe distance
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > minSwipeDistance) {
          // Swiped right - show previous slide
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        } else if (swipeDistance < -minSwipeDistance) {
          // Swiped left - show next slide
          currentIndex = (currentIndex + 1) % slides.length;
        }
        
        updateCarousel();
        
        // Restart auto-advance
        interval = setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateCarousel();
        }, 5000);
      }
      
      // Initialize first slide
      updateCarousel();
    }
  }); 