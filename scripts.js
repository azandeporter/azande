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
  
  // Typewriter effect
  const typewriterText = "Azande Porter";
  const typewriterElement = document.getElementById('typewriter');
  
  let charIndex = 0;
  let isDeleting = false;
  
  function typeWriter() {
    if (!typewriterElement) return;
    
    if (!isDeleting && charIndex < typewriterText.length) {
      // Typing
      typewriterElement.textContent = typewriterText.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWriter, 100);
    } else if (!isDeleting && charIndex === typewriterText.length) {
      // Pause at the end
      setTimeout(() => {
        isDeleting = true;
        typeWriter();
      }, 2000);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      typewriterElement.textContent = typewriterText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeWriter, 50);
    } else {
      // Reset and restart
      isDeleting = false;
      charIndex = 0;
      setTimeout(typeWriter, 1000);
    }
  }
  
  // Start the typewriter effect when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
  });
  
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
  