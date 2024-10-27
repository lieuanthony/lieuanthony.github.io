// Select the navbar links and sections
const links = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');
const nav = document.querySelector('nav ul');
const intro = document.querySelector('.intro');
const logoSpans = document.querySelectorAll('.logo');

// Function to update navbar link color based on scroll position
const changeNav = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.85) {
            // Remove active class from all links
            links.forEach(link => {
                link.classList.remove('active');
            });
            // Add active class to the corresponding link
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
            activeLink.classList.add('active');
        }
    });
};

// Set up IntersectionObserver for sections
const observer = new IntersectionObserver(changeNav, {
    threshold: 0.85
});
sections.forEach(section => {
    observer.observe(section);
});

// Animation for the intro logo
let logoAnimationDelay = 500; // Initial delay between logo letter animations

// Add 'active' class to each logo span for animation (fade-in and move up)
logoSpans.forEach((span, idx) => {
    setTimeout(() => {
        span.classList.add('active');
    }, (idx + 1) * logoAnimationDelay);
});

// Fade out and move up the logo after animation
setTimeout(() => {
    logoSpans.forEach((span, idx) => {
        setTimeout(() => {
            span.classList.remove('active'); // Remove the 'active' class to reverse the fade-in effect
            span.classList.add('fade-out');  // Add 'fade-out' class for fading out and moving up
        }, (idx + 1) * 50);
    });
}, 2000); // Wait 2 seconds before starting the fade-out

// Remove the intro section and show navbar links
setTimeout(() => {
    intro.style.top = '-100vh'; // Move intro off-screen
    nav.classList.add('show');  // Show the navbar
}, 2500); // 2.5 seconds total before hiding intro and showing navbar

// GSAP animation for text effect
gsap.registerPlugin(ScrollTrigger);

const gsapTextElements = gsap.utils.toArray('.gsap-container .gsap-text'); // Select the correct elements

gsapTextElements.forEach(text => {
    gsap.to(text, {
        backgroundSize: '100%', // Animates the background size to 100% on scroll
        ease: 'none', // No easing for smooth transition
        scrollTrigger: {
            trigger: text,
            start: 'top 80%', // Start animation when top of the element hits 80% of the viewport
            end: 'bottom 20%', // End animation when bottom of the element hits 20% of the viewport
            scrub: true, // Allows smooth scrubbing based on scroll position
        },
    });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
      ".about-left",
      { x: "-100%", opacity: 0 },
      {
          x: "0%",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
              trigger: ".about-left",
              start: "top 80%",
          },
      }
  );

  gsap.fromTo(
      ".about-right",
      { x: "100%", opacity: 0 },
      {
          x: "0%",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
              trigger: ".about-right",
              start: "top 80%",
          },
      }
  );
});

// Select the cursor element
const cursor = document.querySelector('.cursor');

// Update cursor position based on mouse movement
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// Add hover effect to links
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-grow');
  });
  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-grow');
  });
});

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);