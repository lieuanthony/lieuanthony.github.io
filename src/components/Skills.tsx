import './Skills.css';

function Skills() {
  return (
    <div className="skills-section">
      <h3>Technical Skills</h3>
      <div className="skills-grid">
        <div className="skill-category">
          <h4>Frontend</h4>
          <div className="skills-list">
            <span className="skill">React</span>
            <span className="skill">TypeScript</span>
            <span className="skill">JavaScript</span>
            <span className="skill">HTML</span>
            <span className="skill">CSS</span>
            <span className="skill">Material UI</span>
          </div>
        </div>
        <div className="skill-category">
          <h4>Backend</h4>
          <div className="skills-list">
            <span className="skill">Node.js</span>
            <span className="skill">Express</span>
            <span className="skill">MongoDB</span>
            <span className="skill">REST API</span>
            <span className="skill">Firebase</span>
          </div>
        </div>
        <div className="skill-category">
          <h4>Tools & Others</h4>
          <div className="skills-list">
            <span className="skill">Git</span>
            <span className="skill">GitHub</span>
            <span className="skill">VS Code</span>
            <span className="skill">Postman</span>
            <span className="skill">Agile</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;