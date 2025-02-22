// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = this.getAttribute('href'); // Get the target section ID
      const targetSection = document.querySelector(targetId); // Find the target section
  
      if (targetSection) {
        // Scroll smoothly to the target section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  const typewriterText = "Azande Porter"; // Text to be typed
  const typewriterElement = document.getElementById('typewriter'); // Target element
  
  let charIndex = 0; // Track current character index
  
  function typeWriter() {
    if (charIndex < typewriterText.length) {
      // Add the next character to the text content
      typewriterElement.textContent += typewriterText.charAt(charIndex);
      charIndex++;
      // Delay before typing the next character
      setTimeout(typeWriter, 100);
    } else {
      // Animation complete, reset for replay (optional)
      setTimeout(() => {
        typewriterElement.textContent = ""; // Clear text
        charIndex = 0;
        typeWriter(); // Restart animation
      }, 5000);
    }
  }
  
  // Start the typewriter effect when the page loads
  typeWriter();
  
  // Scroll progress bar
  window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  });
  
  // Contact form submission
  document
    .getElementById('contact-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const formMessage = document.getElementById('form-message');
      formMessage.textContent =
        'Thank you for your message! I will get back to you soon.';
      formMessage.style.color = '#4CAF50';
      this.reset();
    });
  