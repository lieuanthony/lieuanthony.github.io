import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "./Projects";
import "./ProjectDetail.css";

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <section id="project-detail">
                <div className="detail-container">
                    <button className="back-button" onClick={() => navigate("/#projects")}>
                        &larr; Back to Projects
                    </button>
                    <p>Project not found.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="project-detail">
            <div className="detail-container">
                <button className="back-button" onClick={() => navigate("/#projects")}>
                    &larr; Back to Projects
                </button>

                <h1 className="detail-title">{project.title}</h1>
                <p className="detail-description">{project.longDescription}</p>

                <div className="detail-media">
                    {project.media.map((item, idx) =>
                        item.src ? (
                            item.type === "video" ? (
                                <video key={idx} controls className="media-item">
                                    <source src={item.src} />
                                </video>
                            ) : (
                                <img key={idx} src={item.src} alt={item.alt} className="media-item" />
                            )
                        ) : (
                            <div key={idx} className="media-placeholder">
                                <span>{item.alt}</span>
                            </div>
                        )
                    )}
                </div>

                <div className="tech-stack">
                    {project.tech.map((t) => (
                        <span className="tech-pill" key={t}>{t}</span>
                    ))}
                </div>

                {(project.githubLink || project.liveLink) && (
                    <div className="detail-links">
                        {project.githubLink && (
                            <a className="detail-link" href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                GitHub &rarr;
                            </a>
                        )}
                        {project.liveLink && (
                            <a className="detail-link" href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                Live Site &rarr;
                            </a>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}