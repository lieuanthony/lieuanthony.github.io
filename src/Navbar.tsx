import "./Navbar.css";

export default function Navbar() {
    return (
        <nav id="navbar">
            <span id="nav-name">Anthony Lieu</span>
            <div id="nav-links">
                <a href="#about">About</a>
                <a href="#experience">Experience</a>
                <a href="#projects">Projects</a>
            </div>
            <a
                id="nav-resume"
                href="/assets/Lieu_Anthony_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
                View Resume
            </a>
        </nav>
    );
}