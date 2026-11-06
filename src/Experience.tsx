import "./Experience.css";

interface Experience {
    id: string;
    company: string;
    role: string;
    /** The kind of work and the team it was with. */
    focus: string;
    period: string;
    /** A sentence or two, in my own words. */
    summary: string;
}

const experiences: Experience[] = [
    {
        id: "paychex",
        company: "Paychex",
        role: "Software Engineer Co-op",
        focus: "Platform engineering · Peas in a Pod team",
        period: "May 2026 — Present",
        summary:
            "I work on the platform Paychex developers use to ship to OpenShift, mostly automating manual work and catching bad configs before they deploy. I also help developers with build and deployment issues on our support rotation.",
    },
    {
        id: "rit",
        company: "RIT Department of Software Engineering",
        role: "Software Engineer Co-op",
        focus: "Full stack engineering",
        period: "January 2026 — May 2026",
        summary:
            "I built features for the department's co-op program tool across the whole stack, from the database and API to the dashboard coordinators use every day.",
    },
    {
        id: "excellus",
        company: "Excellus BlueCross BlueShield",
        role: "Software Engineer in Test Co-op",
        focus: "QA engineering · Architecture and Test Automation team",
        period: "June 2025 — August 2025",
        summary:
            "I wrote tests for the shared libraries other teams depend on, taking coverage from 30–40% to over 90%, and fixed a production logging bug along the way.",
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
                            <p className="experience-statement">{exp.summary}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
