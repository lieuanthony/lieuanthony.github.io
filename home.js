// Select the navbar and links
const links = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

// Function to update navbar link color based on scroll position
const changeNav = (entries, observer) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting && entry.intersectionRatio >= 0.85) {
            // Remove active class from all links
            links.forEach(link => link.classList.remove('active'));
            // Get the id of the intersecting section
            const id = entry.target.getAttribute('id');
            // Add active class to the corresponding link
            const newLink = document.querySelector(`[href="#${id}"]`);
            if (newLink) {
                newLink.classList.add('active');
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

const video = document.getElementById('backgroundVideo');

// Set a flag to track if the video has played the first loop
let hasPlayedOnce = false;

// Event listener for when the video ends
video.addEventListener('ended', () => {
    if (!hasPlayedOnce) {
        hasPlayedOnce = true; // Mark that the video has played once
        video.muted = true;   // Mute the video for subsequent loops
        video.currentTime = 0; // Reset the video to the start
        video.play();         // Play the video again
    } else {
        // For subsequent loops, just reset and play silently
        video.currentTime = 0; // Reset the video to the start
        video.play();          // Play the video again
    }
});