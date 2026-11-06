import "./Experience.css";

interface Highlight {
    figure: string;
    label: string;
}

interface Experience {
    id: string;
    company: string;
    role: string;
    /** The kind of work and the team it was with. */
    focus: string;
    period: string;
    /** A short first-person account of the work, not resume bullets. */
    statement: string[];
    highlights: Highlight[];
}

const experiences: Experience[] = [
    {
        id: "paychex",
        company: "Paychex",
        role: "Software Engineer Co-op",
        focus: "Platform engineering · Peas in a Pod team",
        period: "May 2026 — Present",
        statement: [
            "On the Peas in a Pod team I work on the platform Paychex developers use to build and ship to OpenShift. Most of my work is about making that path safer and less manual: I automated a move to new CRD versions across hundreds of repositories, added build-time policy checks so misconfigured apps are caught before they deploy, and fixed a heap-dump loop in the shared Java base image.",
            "I also take weekly turns on the team's support queue, working through build and deployment failures with the developers who hit them. Seeing where people get stuck shapes what I build next.",
        ],
        highlights: [
            { figure: "400+", label: "repositories migrated automatically" },
            { figure: "50%", label: "less waiting on support answers" },
        ],
    },
    {
        id: "rit",
        company: "RIT Department of Software Engineering",
        role: "Software Engineer Co-op",
        focus: "Full stack engineering",
        period: "January 2026 — May 2026",
        statement: [
            "I helped build the tool the department uses to run its co-op program, from the database up. I modeled the schema for projects, proposals, interest forms and applicants, wrote the API behind them, and built the dashboard coordinators and supervisors work in, with table, card and kanban views.",
            "I also extended role-based access so each of the six user roles only sees and does what it should. Working across the whole stack meant taking each feature from requirements to schema to screen.",
        ],
        highlights: [
            { figure: "15+", label: "API endpoints built" },
            { figure: "6", label: "user roles with their own access" },
        ],
    },
    {
        id: "excellus",
        company: "Excellus BlueCross BlueShield",
        role: "Software Engineer in Test Co-op",
        focus: "QA engineering · Architecture and Test Automation team",
        period: "June 2025 — August 2025",
        statement: [
            "On the Architecture and Test Automation team I worked on shared libraries that other engineering teams rely on in production. I wrote the unit and integration tests they were missing, added UI and API automation tests, and traced a production logging bug through library code to fix errors being reported as the wrong type.",
            "Keeping changelogs and documentation accurate was part of the job too. That summer showed me that tests and clear docs are what let teams trust code they didn't write.",
        ],
        highlights: [
            { figure: "90–100%", label: "test coverage, up from 30–40%" },
            { figure: "120+", label: "automated tests added" },
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="home-section">
            <header className="section-head">
                <span className="section-num">01</span>
                <h2 className="section-title">Experience</h2>
            </header>

            <ol id="experience-list">
                {experiences.map((exp) => (
                    <li className="experience-item" key={exp.id}>
                        <div className="experience-side">
                            <span className="experience-period">{exp.period}</span>
                            <span className="experience-role">{exp.role}</span>
                        </div>

                        <div className="experience-main">
                            <h3 className="experience-company">{exp.company}</h3>
                            <p className="experience-focus">{exp.focus}</p>
                            {exp.statement.map((para, i) => (
                                <p className="experience-statement" key={i}>
                                    {para}
                                </p>
                            ))}
                            <dl className="experience-highlights">
                                {exp.highlights.map((h) => (
                                    <div key={h.label}>
                                        <dt>{h.figure}</dt>
                                        <dd>{h.label}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
