import { useNavigate } from "react-router-dom";
import "./Projects.css";

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
}

export const projects: Project[] = [
    {
        id: "overengineered-todo-list",
        title: "Over-Engineered Todo List",
        type: "Personal Project",

        overview:
            "Production-grade todo application intentionally built with enterprise infrastructure to explore real-world backend architecture, container orchestration, and cloud deployment patterns.",

        tech: [
            "TypeScript",
            "Next.js",
            "Express.js",
            "Prisma",
            "PostgreSQL",
            "Docker",
            "Kubernetes",
            "AWS",
            "Terraform",
            "GitHub Actions",
        ],

        contributions: [
            "Architected full-stack application with Next.js frontend and Express.js API using Prisma ORM and PostgreSQL",
            "Containerized services with Docker and deployed to AWS EKS using Kubernetes",
            "Provisioned AWS infrastructure using Terraform modules",
            "Implemented CI/CD pipeline with GitHub Actions automating build and deployment workflows",
        ],

        githubLink: "https://github.com/lieuanthony/overengineered-todo-list",
        liveLink: null,

        media: [
            {
                type: "image",
                src: "/assets/images/todo_list_dashboard.png",
                alt: "Todo dashboard screenshot",
                title: "Application Interface",
                label: "Task Management Dashboard",
            },
            {
                type: "image",
                src: "/assets/images/todo_list_aws.png",
                alt: "AWS architecture diagram",
                title: "System Architecture & Design",
                label: "AWS Infrastructure Layout",
            },
        ],
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
            "Developed serverless backend pipeline using AWS Lambda and API Gateway",
            "Integrated AWS Comprehend to perform sentiment analysis on financial news",
            "Stored processed sentiment results in RDS MySQL database",
            "Built React dashboard to display articles and sentiment scores",
            "Automated infrastructure provisioning with Terraform",
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
    const navigate = useNavigate();

    return (
        <section id="projects">
            <h2 className="section-title">Projects</h2>

            <div className="projects-grid">
                {projects.map((project) => (
                    <div
                        className="project-card"
                        key={project.id}
                        onClick={() => navigate(`/projects/${project.id}`)}
                    >
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
                    </div>
                ))}
            </div>
        </section>
    );
}