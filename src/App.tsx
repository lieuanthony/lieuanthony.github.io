import { useState, useEffect } from "react";
import "./App.css";

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
    <div id="app">
      <div id="container">
        <div id="intro">
          <img id="hirono" src="/assets/images/hirono.png" alt="hirono"></img>
          <p id="title">Hi, I'm Anthony Lieu!</p>
          <p id="description">
            I'm a 3rd-year student studying <mark>Software Engineering</mark> at RIT.
            I enjoy all things problem-solving, from coding to playing video games and bouldering.
            I’m especially interested in building web applications using <mark>cloud technologies</mark> to create scalable and reliable systems.
            I'm currently looking for an internship related to <mark>backend development</mark> in the <mark>Summer/Fall of 2026</mark>.
          </p>
          <div id="links">
            <a className="icon-button" href="https://www.linkedin.com/in/lieuanthony/" target="_blank" rel="noopener noreferrer">
              <img className="icon" src="/assets/icons/linkedin.svg" alt="linkedin"></img>
            </a>
            <a className="icon-button" href="https://github.com/lieuanthony" target="_blank" rel="noopener noreferrer">
              <img className="icon" src="/assets/icons/github.svg" alt="github"></img>
            </a>
            <a className="icon-button" href="/assets/Lieu_Anthony_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <img className="icon" src="/assets/icons/document.svg" alt="document"></img>
            </a>
          </div>
        </div>
         <div id="scroll-arrow" className={showArrow ? '' : 'hidden'} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <svg className="arrow-icon" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div id="cont">
        <div id="card-container">
          <div className="card">
            sdf
          </div>
          <div className="card">
            sdf
          </div>
          <div className="card">
            sdf
          </div>
          <div className="card">
            sdf
          </div>
        </div>
      </div>
      <footer id="foot">
        <p>Portfolio made by Anthony Lieu</p>
      </footer>
    </div>
  );
}