import { useState, useEffect } from "react";
import "./About.css";

export default function App() {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <section id="about">
        <div id="intro">
          <img id="hirono-img" src="/assets/images/hirono.png" alt="Hirono"></img>
          <p id="name">Hi, I'm Anthony Lieu!</p>
          <p id="bio">
            I'm a 3rd-year student studying <mark>Software Engineering</mark> at RIT.
            I enjoy all things problem-solving, from coding to playing video games and bouldering.
            I’m especially interested in building web applications using <mark>cloud technologies</mark> to create scalable and reliable systems.
            I'm currently looking for an internship related to <mark>backend development</mark> in the <mark>Summer/Fall of 2026</mark>.
          </p>
          <div id="links">
            <a className="icon-link" href="https://www.linkedin.com/in/lieuanthony/" target="_blank" rel="noopener noreferrer">
              <img className="icon" src="/assets/icons/linkedin.svg" alt="LinkedIn"></img>
            </a>
            <a className="icon-link" href="https://github.com/lieuanthony" target="_blank" rel="noopener noreferrer">
              <img className="icon" src="/assets/icons/github.svg" alt="GitHub"></img>
            </a>
            <a className="icon-link" href="/assets/Lieu_Anthony_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <img className="icon" src="/assets/icons/document.svg" alt="Resume"></img>
            </a>
          </div>
        </div>
         <div id="scroll-arrow" className={showArrow ? '' : 'hidden'} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <svg className="arrow-icon" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
    </section>
  );
}