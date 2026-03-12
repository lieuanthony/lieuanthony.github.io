import { useNavigate } from "react-router-dom";
import "./Projects.css";

export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    tech: string[];
    githubLink: string | null;
    liveLink: string | null;
    media: { type: "image" | "video"; src: string; alt: string }[];
}

export const projects: Project[] = [
    {
        id: "overengineered-todo",
        title: "Over-Engineered Todo List",
        subtitle: "Personal Project",
        description: "Production-grade todo app intentionally built with enterprise-level infrastructure to explore real-world backend and cloud engineering patterns.",
        longDescription: "I built this as a learning project to see what it actually takes to run a simple app in a production-like environment. The app itself is just a todo list, but under the hood it uses Next.js for the frontend, Express.js for the API, and Prisma with PostgreSQL for the database. The more interesting part was the infrastructure: everything runs on AWS EKS, provisioned with Terraform, and deployed automatically through a GitHub Actions CI/CD pipeline.",
        tech: ["TypeScript", "Next.js", "Express.js", "Prisma", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions"],
        githubLink: "https://github.com/lieuanthony/overengineered-todo",
        liveLink: null,
        media: [
            { type: "image", src: "", alt: "Todo app screenshot" },
            { type: "image", src: "", alt: "AWS architecture diagram" },
        ],
    },
    {
        id: "stock-market-analyzer",
        title: "Stock Market News Analyzer",
        subtitle: "Personal Project",
        description: "Cloud-based application for real-time news sentiment analysis using AWS Comprehend, with automated workflow pipeline for infrastructure provisioning.",
        longDescription: "This app pulls real-time stock market news from the Tiingo API, runs it through AWS Comprehend for sentiment analysis, and stores the results in an RDS MySQL database. The backend is built as a serverless pipeline with AWS Lambda and API Gateway, keeping each stage separate so they can scale on their own. The React frontend lets you browse articles and see their sentiment scores. Infrastructure is managed with Terraform and the whole thing deploys automatically through GitHub Actions.",
        tech: ["Python", "React", "MySQL", "AWS Lambda", "API Gateway", "Terraform", "GitHub Actions"],
        githubLink: null,
        liveLink: null,
        media: [
            { type: "image", src: "", alt: "Sentiment dashboard screenshot" },
            { type: "image", src: "", alt: "AWS architecture diagram" },
        ],
    },
    {
        id: "nutrikit",
        title: "NutriKit",
        subtitle: "Personal Project",
        description: "Food management application for tracking nutritional information with React frontend and Flask REST API backend, using PostgreSQL for data persistence.",
        longDescription: "NutriKit is a nutrition tracking app where you can log meals and keep track of your macros over time. The frontend is built with React and talks to a Flask REST API backend, with PostgreSQL handling data storage. It was a good exercise in building a clean API layer and keeping the frontend and backend properly separated.",
        tech: ["React", "Flask", "PostgreSQL"],
        githubLink: null,
        liveLink: null,
        media: [
            { type: "image", src: "", alt: "NutriKit dashboard" },
        ],
    },
    {
        id: "u-fund",
        title: "U-Fund",
        subtitle: "Course Project",
        description: "Full-stack charity platform with donation and volunteer management workflows, featuring secure authentication and RESTful API integration.",
        longDescription: "U-Fund is a charity platform I built with a team of 5 using Agile. It lets users donate to causes and sign up to volunteer. I worked on the Angular frontend and helped wire it up to the Spring Boot REST API on the backend. We also handled user authentication and made sure the API was cleanly structured across the different features.",
        tech: ["Java", "Angular", "Spring Boot"],
        githubLink: null,
        liveLink: null,
        media: [
            { type: "image", src: "", alt: "U-Fund charity platform" },
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
                                <img src={project.media[0].src} alt={project.media[0].alt} />
                            ) : (
                                <div className="card-image-placeholder" />
                            )}
                        </div>
                        <div className="card-info">
                            <span className="card-subtitle">{project.subtitle}</span>
                            <span className="card-title">{project.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}