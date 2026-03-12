import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "./Projects";
import "./ProjectDetail.css";

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <section id="project-detail">
                <div className="detail-container">

                    <Link to="/#projects" className="back-link">
                        &larr; Back to Work
                    </Link>

                    <p>Project not found.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="project-detail">
            <div className="detail-container">

                <Link to="/#projects" className="back-link">
                    &larr; Back to Work
                </Link>

                <p className="project-type">{project.type}</p>

                <h1 className="detail-title">{project.title}</h1>

                <div className="detail-section">
                    <h2>Overview</h2>
                    <p>{project.overview}</p>
                </div>

                <div className="detail-section">
                    <h2>Technologies</h2>

                    <div className="tech-stack">
                        {project.tech.map((t) => (
                            <span className="tech-pill" key={t}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="detail-media">
                    {project.media.map((item, idx) => (
                        <div key={idx} className="media-block">

                            {item.title && (
                                <h3 className="media-title">
                                    {item.title}
                                </h3>
                            )}

                            {item.src ? (
                                item.type === "video" ? (
                                    <video controls className="media-item">
                                        <source src={item.src} />
                                    </video>
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="media-item"
                                    />
                                )
                            ) : (
                                <div className="media-placeholder">
                                    {item.alt}
                                </div>
                            )}

                            {item.label && (
                                <p className="media-label">
                                    {item.label}
                                </p>
                            )}

                        </div>
                    ))}
                </div>

                <div className="detail-section">
                    <h2>Key Contributions</h2>

                    <ul className="detail-list">
                        {project.contributions.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}
                    </ul>
                </div>

                {(project.githubLink || project.liveLink) && (
                    <div className="detail-links">

                        {project.githubLink && (
                            <a
                                className="detail-link github-link"
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub →
                            </a>
                        )}

                        {project.liveLink && (
                            <a
                                className="detail-link"
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live Site →
                            </a>
                        )}

                    </div>
                )}

            </div>
        </section>
    );
}