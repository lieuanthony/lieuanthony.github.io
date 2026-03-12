import "./Footer.css";

export default function Footer() {
    return (
        <footer id="page-footer">
            <div id="footer-inner">
                <div id="footer-left">
                    <span className="footer-label">Contact</span>
                    <p id="footer-cta">Let's connect!</p>
                    <a id="footer-email" href="mailto:anthonyjunlieu@gmail.com">
                        anthonyjunlieu@gmail.com →
                    </a>
                </div>

                <div id="footer-right">
                    <div className="footer-col">
                        <span className="footer-label">Navigate</span>
                        <a href="#about">About</a>
                        <a href="#experience">Experience</a>
                        <a href="#projects">Projects</a>
                    </div>
                    <div className="footer-col">
                        <span className="footer-label">Social</span>
                        <a href="https://www.linkedin.com/in/lieuanthony/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                        <a href="https://github.com/lieuanthony" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                    </div>
                </div>
            </div>

            <div id="footer-bottom">
                <span>Portfolio made by Anthony Lieu</span>
            </div>
        </footer>
    );
}