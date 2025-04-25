import './Projects.css';
import Skills from '../components/Skills';

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-content">
        <h2>Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <img 
              src="/project1.jpg" 
              alt="Portfolio Website" 
              className="project-image"
            />
            <div className="project-info">
              <h3>Portfolio Website</h3>
              <p>
                A modern, responsive portfolio website built with React and TypeScript. 
                Features smooth scrolling, video backgrounds, and a clean, minimalist design.
              </p>
              <div className="project-skills">
                <span className="project-skill">React</span>
                <span className="project-skill">TypeScript</span>
                <span className="project-skill">CSS</span>
                <span className="project-skill">HTML</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/lieuanthony/lieuanthony.github.io" target="_blank" rel="noopener noreferrer">Source Code</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <img 
              src="/project2.jpg" 
              alt="E-commerce Platform" 
              className="project-image"
            />
            <div className="project-info">
              <h3>E-commerce Platform</h3>
              <p>
                A full-stack e-commerce platform with user authentication, product management, 
                and payment processing. Built with React, Node.js, and MongoDB.
              </p>
              <div className="project-skills">
                <span className="project-skill">React</span>
                <span className="project-skill">Node.js</span>
                <span className="project-skill">MongoDB</span>
                <span className="project-skill">Express</span>
                <span className="project-skill">REST API</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Source Code</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <img 
              src="/project3.jpg" 
              alt="Task Management App" 
              className="project-image"
            />
            <div className="project-info">
              <h3>Task Management App</h3>
              <p>
                A collaborative task management application with real-time updates, 
                drag-and-drop functionality, and team collaboration features.
              </p>
              <div className="project-skills">
                <span className="project-skill">React</span>
                <span className="project-skill">Firebase</span>
                <span className="project-skill">Material UI</span>
                <span className="project-skill">WebSocket</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Source Code</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <img 
              src="/project4.jpg" 
              alt="Weather Dashboard" 
              className="project-image"
            />
            <div className="project-info">
              <h3>Weather Dashboard</h3>
              <p>
                A weather application that provides real-time weather data, forecasts, 
                and interactive maps. Built with React and various weather APIs.
              </p>
              <div className="project-skills">
                <span className="project-skill">React</span>
                <span className="project-skill">API Integration</span>
                <span className="project-skill">Chart.js</span>
                <span className="project-skill">Geolocation</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Source Code</a>
              </div>
            </div>
          </div>
        </div>
        <Skills />
      </div>
    </section>
  );
}

export default Projects;