// Select the navbar links and sections
const links = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

// Function to update navbar link color based on scroll position
const changeNav = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.85) {
            // Remove active class from all links
            links.forEach(link => {
                link.classList.remove('active');
                link.style.fontSize = '2em'; // Reset font size
            });

            // Get the id of the intersecting section
            const id = entry.target.getAttribute('id');
            // Add active class to the corresponding link
            const newLink = document.querySelector(`[href="#${id}"]`);
            if (newLink) {
                newLink.classList.add('active');
                newLink.style.fontSize = '2.2em'; // Increase font size of active link
            }
        }
    });
}

const options = {
    threshold: 0.85
}

const observer = new IntersectionObserver(changeNav, options);

// Target the sections to be observed
sections.forEach((section) => {
    observer.observe(section);
});

// Select the navbar and intro elements
let navLinks = document.querySelector('nav ul');
let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    // Animate logo spans
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add('active');
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      // Fade out logo spans
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.remove('active');
          span.classList.add('fade');
        }, (idx + 1) * 50);
      });
    }, 2000);

    setTimeout(() => {
      // Hide intro and reveal navbar links
      intro.style.top = '-100vh';
      navLinks.style.visibility = 'visible';
      navLinks.style.opacity = '1'; // Optional: to make it fade in smoothly
    }, 2300); // This matches the timing of your intro animation
  });
});