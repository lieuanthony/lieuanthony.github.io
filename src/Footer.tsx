import "./Footer.css";

const links = [
    { label: "Email", value: "anthonyjunlieu@gmail.com", href: "mailto:anthonyjunlieu@gmail.com", external: false },
    { label: "LinkedIn", value: "in/lieuanthony", href: "https://www.linkedin.com/in/lieuanthony/", external: true },
    { label: "GitHub", value: "lieuanthony", href: "https://github.com/lieuanthony", external: true },
];

export default function Footer() {
    return (
        <footer id="contact">
            <div id="footer-inner">
                <div id="footer-left">
                    <span className="footer-label">03 Contact</span>
                    <p id="footer-cta">Let's connect!</p>
                    <p id="footer-note">Email is the fastest way to reach me.</p>
                </div>

                <ul id="footer-links">
                    {links.map((l) => (
                        <li key={l.label}>
                            <a
                                href={l.href}
                                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                                <span className="footer-link-label">{l.label}</span>
                                <span className="footer-link-value">{l.value}</span>
                                <span className="footer-link-arrow" aria-hidden="true">
                                    {l.external ? "↗" : "→"}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="footer-bottom">
                <span>© {new Date().getFullYear()} Anthony Lieu</span>
            </div>
        </footer>
    );
}
