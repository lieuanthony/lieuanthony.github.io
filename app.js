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
