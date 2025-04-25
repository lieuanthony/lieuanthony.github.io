import './Experience.css';

function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="experience-content">
        <h2>Experience</h2>
        <div className="experience-item">
          <h3>Software Engineer</h3>
          <h4>Company Name</h4>
          <p className="date">2022 - Present</p>
          <p>
            As a Software Engineer, I work on developing and maintaining web applications using modern technologies.
            My responsibilities include:
          </p>
          <ul>
            <li>Building responsive user interfaces with React and TypeScript</li>
            <li>Implementing RESTful APIs and backend services</li>
            <li>Collaborating with cross-functional teams on feature development</li>
            <li>Writing clean, maintainable code and conducting code reviews</li>
            <li>Participating in agile development processes</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Experience;