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
        id: "intelligent-stock-market-news-analyzer",
        title: "Intelligent Stock Market News Analyzer",
        type: "Course Project",

        overview:
            "Cloud-based application that analyzes financial news sentiment using AWS Comprehend and stores results for real-time browsing through a React frontend.",

        tech: [
            "Python",
            "React",
            "MySQL",
            "AWS Lambda",
            "API Gateway",
            "Terraform",
            "GitHub Actions",
        ],

        contributions: [
            "Architected a serverless backend that decouples ingestion, sentiment processing, and data serving, keeping the dashboard responsive during heavy ingestion",
            "Implemented real-time news ingestion and sentiment scoring for the Nasdaq-100, loading about 1,000 articles initially then processing roughly 10 per stock per minute",
            "Designed interactive sentiment charts across hourly, daily, and weekly timeframes, with a companion price chart to compare sentiment shifts against price movement",
            "Created email notifications that alert users whenever sentiment changes for a stock on their watchlist",
            "Automated environment setup and teardown with Terraform to remove manual deployment steps",
        ],

        githubLink: null,
        liveLink: null,

        media: [
            {
                type: "image",
                src: "/assets/images/news_analyzer_dashboard.png",
                alt: "Sentiment Dashboard Mockup",
                title: "Application Interface Mockup",
                label: "News Sentiment Visualization",
            },
            {
                type: "image",
                src: "/assets/images/news_analyzer_aws.png",
                alt: "AWS Architecture Diagram",
                title: "System Architecture & Design",
                label: "High Level Data Flow Architecture Diagram",
            },
        ],
    },
];

export default function Projects() {
    return (
        <section id="projects">
            <h2 className="section-title">Projects</h2>

            <div className="projects-grid">
                {projects.map((project) => (
                    <Link className="project-card" key={project.id} to={`/projects/${project.id}`}>
                        <div className="card-image">
                            {project.media[0]?.src ? (
                                <img
                                    src={project.media[0].src}
                                    alt={project.media[0].alt}
                                />
                            ) : (
                                <div className="card-image-placeholder" />
                            )}
                        </div>

                        <div className="card-info">
                            <span className="card-subtitle">{project.type}</span>
                            <span className="card-title">{project.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}