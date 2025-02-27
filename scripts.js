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
  
  const typewriterText = "Azande Porter";
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
      setTimeout(() => {
        typewriterElement.textContent = "";
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
  const form = document.getElementById("email-signup-form");
    const emailInput = document.getElementById("email-input");

    if (!form || !emailInput) {
        console.error("Form or input field not found.");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        if (!email) {
            alert("Please enter a valid email.");
            return;
        }

        try {
            // Call my backend
            const response = await fetch("https://408gic7h21.execute-api.us-east-1.amazonaws.com/v1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                alert("You're now subscribed to Strive Syndicate!");
                emailInput.value = ""; // Clear input after success
            } else {
                alert(data.error || "Subscription failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Try again later.");
        }
    });
  