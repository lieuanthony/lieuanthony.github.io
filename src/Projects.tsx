import "./Projects.css"

export default function Projects() {
    const projects = [
        {
            title: "Say Less",
            description: "Real-time multiplayer voice game with WebSocket server managing synchronized lobbies, live audio streaming, and server-authoritative game state validation.",
            tech: ["Python", "React", "Redis", "PostgreSQL", "AWS"],
            link: "https://github.com/lieuanthony"
        },
        {
            title: "Stock Market News Analyzer",
            description: "Serverless application for real-time news sentiment analysis using AWS Comprehend, with automated workflow pipeline for infrastructure provisioning.",
            tech: ["Python", "React", "MySQL", "AWS"],
            link: "https://github.com/lieuanthony"
        },
        {
            title: "NutriKit",
            description: "Food management application for tracking nutritional information with React frontend and Flask REST API backend, using PostgreSQL for data persistence.",
            tech: ["React", "Flask", "PostgreSQL"],
            link: "https://github.com/lieuanthony"
        },
        {
            title: "U-Fund",
            description: "Full-stack charity platform with donation and volunteer management workflows, featuring secure authentication and RESTful API integration.",
            tech: ["Java", "Angular", "Spring Boot"],
            link: "https://github.com/lieuanthony"
        }
    ];

    return (
        <section id="projects">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
                {projects.map((project, idx) => (
                <div className="project-card" key={idx}>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="tech-stack">
                        {project.tech.map((t) => (
                        <span className="tech-pill" key={t}>{t}</span>
                        ))}
                    </div>
                    <a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project -{">"}
                    </a>
                </div>
                ))}
            </div>
        </section>
    );
}