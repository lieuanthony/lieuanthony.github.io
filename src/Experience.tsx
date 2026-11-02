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
        id: "paychex",
        role: "Software Engineer Co-op",
        company: "Paychex",
        period: "May 2026 — Present",
        bullets: [
            "Automated the migration of 400+ repositories across multiple departments to new OpenShift CRD versions, eliminating 20+ hours of manual manifest updates.",
            "Resolved an infinite heap-dump loop in the OpenShift base image health monitor and hardened restart logic against transient errors, improving stability for apps built on the shared Java base images.",
            "Introduced v2 OpenShift application and project CRDs with build-time policy checks across the onboarding service and Gradle plugin, preventing misconfigured tags from reaching deployment.",
            "Fixed the XL Release secret rotation template rotating only the first account and added parallel execution for up to 10 accounts, ensuring every account's secrets rotate in a single run.",
            "Reduced the team support queue backlog by resolving 6–8 issues per weekly rotation, including build and deployment failures, cutting developer wait time for answers by 50%.",
        ],
    },
    {
        id: "scoop",
        role: "Software Engineer Co-op",
        company: "RIT Department of Software Engineering",
        period: "January 2026 — May 2026",
        bullets: [
            "Built 15+ CRUD API endpoints for projects, project proposals, interest forms, and the applicant dashboard, enabling coordinators and supervisors to manage the co-op project lifecycle in one place.",
            "Modeled the database schema for the co-op program's entities, including projects, proposals, interest forms, and applicants, translating product requirements into a normalized structure of related tables.",
            "Expanded role-based access control across 6 user roles, restricting API access and conditionally rendering UI features based on each role's permissions so users only see and do what their role allows.",
            "Developed the frontend dashboard for these features, including the applicant view, with table, card, and kanban views so users can work in the layout that suits them.",
        ],
    },
    {
        id: "excellus",
        role: "Software Engineer in Test Co-op",
        company: "Excellus BlueCross BlueShield",
        period: "June 2025 — August 2025",
        bullets: [
            "Achieved 90–100% test coverage across 6 shared libraries, up from 30–40%, by building unit and integration test suites that covered previously untested code paths relied on in production by downstream teams.",
            "Diagnosed a production logging defect by tracing masked error types through shared library code, then patched the root cause to restore accurate error reporting across all dependent engineering systems.",
            "Added 120+ test cases across UI and API automation codebases and ran regression testing after changes to confirm UI workflows and API behavior remained stable.",
            "Authored changelogs and revised README, internal, and SharePoint documentation, keeping references accurate for the engineers consuming the shared libraries.",
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