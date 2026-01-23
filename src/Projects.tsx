import "./Projects.css"

export default function Projects() {
    const projects = [
{
title: "Game Lobby Service",
description: "Backend service for creating temporary game lobbies with unique codes, Redis-backed and race-condition safe.",
tech: ["Node.js", "Redis", "PostgreSQL"],
link: "https://github.com/lieuanthony"
},
{
title: "Senior Project Portal",
description: "Web portal for managing senior projects, roles, and submissions for the SE department.",
tech: ["React", "Express", "PostgreSQL"],
link: "#"
},
{
title: "Portfolio Website",
description: "Personal portfolio showcasing projects, resume, and contact links.",
tech: ["React", "CSS"],
link: "#"
},
{
title: "Voice-to-Text Web App",
description: "Web app that captures audio and transcribes speech using cloud services.",
tech: ["AWS Transcribe", "React"],
link: "#"
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