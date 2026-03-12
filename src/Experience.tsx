import { useState } from "react";
import "./Experience.css";

interface Experience {
    id: string;
    role: string;
    company: string;
    period: string;
    bullets: string[];
}

const experiences: Experience[] = [
    {
        id: "scoop",
        role: "Software Engineer Co-op",
        company: "RIT Department of Software Engineering",
        period: "January 2026 — Present",
        bullets: [
            "Constructed RESTful API endpoints for coordinator and supervisor workflows using Express.js and Prisma ORM, supporting full CRUD operations on users, projects, proposals, and teams across the application.",
            "Modeled relational database schemas in Prisma to accurately represent co-op program entities and their relationships, translating product requirements into a normalized, query-efficient MariaDB structure.",
            "Extended role-based access control across 4 user roles by expanding existing Express.js middleware and Next.js routing logic to restrict API access and conditionally render UI features based on each role's permissions.",
            "Participated in Agile development practices including sprint planning, backlog grooming, and peer code reviews, coordinating with teammates to track progress and deliver features iteratively on a self-directed team.",
        ],
    },
    {
        id: "excellus",
        role: "Software Engineer in Test Co-op",
        company: "Excellus BlueCross BlueShield",
        period: "June 2025 — August 2025",
        bullets: [
            "Achieved 90–100% test coverage across 6 shared libraries, up from 30–40%, by building comprehensive JUnit unit and integration test suites that eliminated untested code paths relied on in production by downstream teams.",
            "Diagnosed a production logging defect by tracing masked error types through shared library code, then patched the root cause to restore accurate error reporting across all dependent engineering systems.",
            "Expanded test coverage across Selenium and RestAssured codebases by adding new JUnit test cases and performing regression testing to verify UI workflows and REST API behavior remained stable after changes.",
            "Updated technical documentation across README files, Excellus internal docs, and SharePoint pages by authoring changelogs and revising content as needed, keeping references accurate for engineers consuming the shared libraries.",
        ],
    },
];

export default function Experience() {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="experience">
            <h2 className="section-title">Experience</h2>
            <div id="experience-list">
                {experiences.map((exp) => (
                    <div className="experience-item" key={exp.id}>
                        <button
                            className="experience-header"
                            onClick={() => toggle(exp.id)}
                            aria-expanded={openId === exp.id}
                        >
                            <div className="experience-header-left">
                                <span className="experience-role">{exp.role}</span>
                                <span className="experience-meta">{exp.company} &middot; {exp.period}</span>
                            </div>
                            <span className={`experience-chevron ${openId === exp.id ? "open" : ""}`}>
                                <svg viewBox="0 0 24 24" width="18" height="18">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </button>
                        <div className={`experience-body ${openId === exp.id ? "open" : ""}`}>
                            <ul className="experience-bullets">
                                {exp.bullets.map((bullet, idx) => (
                                    <li key={idx}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}