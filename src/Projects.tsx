import { Link } from "react-router-dom";
import "./Projects.css";
import type { CaseStudy } from "./CaseStudy";
import { fluently } from "./caseStudies/fluently";

export interface Project {
    id: string;
    title: string;
    type: string;
    overview: string;
    tech: string[];
    contributions: string[];
    githubLink: string | null;
    liveLink: string | null;

    media: {
        type: "image" | "video";
        src: string;
        alt: string;
        label?: string;
        title?: string;
    }[];

    /** A long-form write-up. When set, the project page shows it instead of the short layout. */
    caseStudy?: CaseStudy;

    /** Private work: shown on the home page with its links locked, and no project page. */
    locked?: boolean;
}

export const projects: Project[] = [
    {
        id: "fluently",
        title: "Fluently",
        type: "Personal Project",

        overview:
            "Free speaking-practice web app that marks filler words, mid-phrase pauses, and repeats in your answers, with speech transcribed privately in the browser.",

        tech: ["TypeScript", "React", "Whisper", "Supabase", "Gemini", "Vercel"],

        contributions: [],

        githubLink: null,
        liveLink: "https://fluently-one-ruby.vercel.app",

        media: [
            {
                type: "image",
                src: "/assets/images/fluently_landing.png",
                alt: "Fluently landing page",
            },
        ],

        caseStudy: fluently,
    },

    {
        id: "scoop-portal",
        title: "SCOOP Portal",
        type: "Co-op Project · RIT",

        overview:
            "The portal RIT's software engineering department uses to run its co-op program: projects, proposals, interest forms, and applicants in one place, with access set by role.",

        tech: [],
        contributions: [],

        githubLink: null,
        liveLink: null,
        media: [],

        locked: true,
    },
];

function LockIcon() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="lock-icon">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="home-section">
            <header className="section-head">
                <span className="section-num">02</span>
                <h2 className="section-title">Projects</h2>
            </header>

            <div className="projects-list">
                {projects.map((project) => (
                    <article className="project-card" key={project.id}>
                        {project.locked ? (
                            <div className="card-image card-image-locked">
                                <img className="locked-logo" src="/assets/images/rit.png" alt="RIT" />
                                <span className="locked-badge">
                                    <LockIcon />
                                </span>
                            </div>
                        ) : (
                            <div className="card-image">
                                {project.media[0]?.src ? (
                                    <img src={project.media[0].src} alt={project.media[0].alt} />
                                ) : (
                                    <div className="card-image-placeholder" />
                                )}
                            </div>
                        )}

                        <div className="card-info">
                            <span className="card-subtitle">{project.type}</span>
                            <h3 className="card-title">{project.title}</h3>
                            <p className="card-overview">{project.overview}</p>
                            <div className="card-actions">
                                {project.locked ? (
                                    <span className="card-button is-locked" aria-disabled="true">
                                        Case Study <LockIcon />
                                    </span>
                                ) : (
                                    <Link className="card-button" to={`/projects/${project.id}`}>
                                        Case Study <span aria-hidden="true">→</span>
                                    </Link>
                                )}
                            </div>
                            {project.locked && <p className="card-locked-note">Private to RIT.</p>}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
