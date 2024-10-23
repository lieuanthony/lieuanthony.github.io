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