import React from "react";
import "./App.css";

export default function App() {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="card-container">
      <div className="business-card">
        <div className="card-texture" />
        
        <div className="card-content">
          <div className="phone-number">
            <p>518.366.0679</p>
          </div>

          <div className="company-info">
            <h1 className="company-name">PIERCE & PIERCE</h1>
            <p className="company-department">MERGERS AND AQUISITIONS</p>
          </div>

          <div className="person-info">
            <h2 className="person-name">ANTHONY LIEU</h2>
            <p className="person-title">SOFTWARE ENGINEER</p>
          </div>

          <div className="contact-info">
            <p className="location">SCHENECTADY, NEW YORK</p>
            
            <div className="social-links">
              <a href="https://github.com/lieuanthony" target="_blank" rel="noopener noreferrer">GITHUB</a>
              <span>|</span>
              <a href="https://linkedin.com/in/lieuanthony" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
              <span>|</span>
              <a href="mailto:anthonyjunlieu@gmail.com" target="_blank" rel="noopener noreferrer">EMAIL</a>
              <span>|</span>
              <a href="assets/Lieu_Anthony_Resume.pdf" target="_blank" rel="noopener noreferrer">RESUME</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}