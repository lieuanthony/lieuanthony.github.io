import "./Footer.css";

export default function Footer() {
    return (
        <footer id="contact">
            <div id="footer-inner">
                <div id="footer-left">
                    <span className="footer-label">Contact</span>
                    <p id="footer-cta">Let's connect!</p>
                    <a id="footer-email" href="mailto:anthonyjunlieu@gmail.com">
                        anthonyjunlieu@gmail.com →
                    </a>
                    <div id="footer-social">
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