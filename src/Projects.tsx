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

        tech: [
            "TypeScript",
            "React",
            "Vite",
            "Whisper (transformers.js)",
            "Web Workers",
            "Supabase",
            "PostgreSQL",
            "Deno Edge Functions",
            "Gemini API",
            "Vercel",
            "Vitest",
            "GitHub Actions",
        ],

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

function ProjectInfo({ project }: { project: Project }) {
    return (
        <div className="card-info">
            <span className="card-subtitle">{project.type}</span>
            <span className="card-title">{project.title}</span>
            <p className="card-overview">{project.overview}</p>
            {project.locked ? (
                <div className="card-locked">
                    <div className="card-locked-buttons">
                        <span className="locked-button" aria-disabled="true">
                            Demo <LockIcon />
                        </span>
                        <span className="locked-button" aria-disabled="true">
                            Case Study <LockIcon />
                        </span>
                    </div>
                    <p className="card-locked-note">
                        Private to RIT.{" "}
                        <a href="mailto:anthonyjunlieu@gmail.com?subject=SCOOP%20Portal">Ask me about it</a>
                    </p>
                </div>
            ) : (
                <span className="card-more">
                    {project.caseStudy ? "Read the case study" : "View project"} <span aria-hidden="true">→</span>
                </span>
            )}
        </div>
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
                {projects.map((project) =>
                    project.locked ? (
                        <article className="project-card is-locked" key={project.id}>
                            <div className="card-image card-image-locked">
                                <span className="locked-wordmark">{project.title.split(" ")[0]}</span>
                                <span className="locked-badge">
                                    <LockIcon />
                                </span>
                            </div>
                            <ProjectInfo project={project} />
                        </article>
                    ) : (
                        <Link className="project-card" key={project.id} to={`/projects/${project.id}`}>
                            <div className="card-image">
                                {project.media[0]?.src ? (
                                    <img src={project.media[0].src} alt={project.media[0].alt} />
                                ) : (
                                    <div className="card-image-placeholder" />
                                )}
                            </div>
                            <ProjectInfo project={project} />
                        </Link>
                    )
                )}
            </div>
        </section>
    );
}
