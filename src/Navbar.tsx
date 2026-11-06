import { useEffect, useState } from "react";
import "./Navbar.css";

const links = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
];

/** The section being read: the last one whose top has passed the upper third of the screen. */
function useCurrentSection(): string {
    const [current, setCurrent] = useState(links[0].id);
    useEffect(() => {
        const onScroll = () => {
            const line = window.innerHeight / 3;
            let at = links[0].id;
            for (const { id } of links) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= line) at = id;
            }
            // The footer is short; at the very bottom it counts even before reaching the line.
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) at = "contact";
            setCurrent(at);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);
    return current;
}

export default function Navbar() {
    const current = useCurrentSection();
    return (
        <nav id="navbar">
            <a id="nav-name" href="#about">
                Anthony Lieu
            </a>
            <div id="nav-links">
                {links.map((l) => (
                    <a key={l.id} href={`#${l.id}`} aria-current={current === l.id ? "location" : undefined}>
                        {l.label}
                    </a>
                ))}
            </div>
            <a id="nav-resume" href="/assets/Lieu_Anthony_Resume.pdf" target="_blank" rel="noopener noreferrer">
                View Resume
            </a>
        </nav>
    );
}
