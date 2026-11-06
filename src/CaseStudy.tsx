import { Link } from "react-router-dom";
import "./CaseStudy.css";

/** A term with its explanation, for the "at a glance" panel and term lists. */
export interface Term {
    term: string;
    text: string;
}

export interface Figure {
    src: string;
    alt: string;
    caption: string;
}

/** One piece of a section: a paragraph, a list, numbered steps, or a captioned image. */
export type Block =
    | { p: string }
    | { list: (string | Term)[] }
    | { steps: Term[] }
    | { figure: Figure };

export interface CaseStudySection {
    id: string;
    title: string;
    blocks: Block[];
}

export interface CaseStudy {
    /** One paragraph under the title. */
    lead: string;
    liveLink: string | null;
    /** Shown in place of a GitHub link, e.g. when the repository is private. */
    codeNote: string | null;
    glance: Term[];
    sections: CaseStudySection[];
}

interface Props {
    type: string;
    title: string;
    tech: string[];
    study: CaseStudy;
}

const num = (i: number) => String(i + 1).padStart(2, "0");

/** "Instant feedback." reads as a label in the left column, so its full stop goes. */
const label = (term: string) => term.replace(/\.$/, "");

function BlockView({ block }: { block: Block }) {
    if ("p" in block) return <p>{block.p}</p>;
    if ("list" in block) {
        // A list of terms is a two-column table of rows; plain items are bullets.
        if (block.list.every((item) => typeof item !== "string"))
            return (
                <ul className="cs-terms">
                    {(block.list as Term[]).map((t) => (
                        <li key={t.term}>
                            <strong>{label(t.term)}</strong>
                            <span>{t.text}</span>
                        </li>
                    ))}
                </ul>
            );
        return (
            <ul className="cs-list">
                {block.list.map((item, i) => (
                    <li key={i}>{typeof item === "string" ? item : `${item.term} ${item.text}`}</li>
                ))}
            </ul>
        );
    }
    if ("steps" in block)
        return (
            <ol className="cs-steps">
                {block.steps.map((s, i) => (
                    <li key={i}>
                        <span className="cs-step-num" aria-hidden="true">
                            {i + 1}
                        </span>
                        <div>
                            <strong>{label(s.term)}</strong>
                            <span>{s.text}</span>
                        </div>
                    </li>
                ))}
            </ol>
        );
    return (
        <figure className="cs-figure">
            <a href={block.figure.src} target="_blank" rel="noopener noreferrer" title="Open full size">
                <img src={block.figure.src} alt={block.figure.alt} loading="lazy" />
            </a>
            <figcaption>{block.figure.caption}</figcaption>
        </figure>
    );
}

/** A project written up like a document: header, at a glance, contents, then numbered sections. */
export default function CaseStudyView({ type, title, tech, study }: Props) {
    return (
        <article id="case-study">
            <div className="cs-container">
                <Link to="/#projects" className="back-link">
                    &larr; Back to Work
                </Link>

                <header className="cs-head">
                    <p className="project-type">{type}</p>
                    <h1 className="cs-title">{title}</h1>
                    <p className="cs-lead">{study.lead}</p>
                    <div className="cs-links">
                        {study.liveLink && (
                            <a className="cs-button" href={study.liveLink} target="_blank" rel="noopener noreferrer">
                                Visit the live site →
                            </a>
                        )}
                        {study.codeNote && <p className="cs-code-note">{study.codeNote}</p>}
                    </div>
                </header>

                <ul className="cs-glance" aria-label="At a glance">
                    {study.glance.map((g) => (
                        <li key={g.term}>
                            <strong>{g.term}</strong>
                            <span>{g.text}</span>
                        </li>
                    ))}
                    <li className="cs-glance-wide">
                        <strong>Built with</strong>
                        <span>{tech.join(" · ")}</span>
                    </li>
                </ul>

                <div className="cs-body">
                    <nav className="cs-toc" aria-label="On this page">
                        <p className="cs-label">On this page</p>
                        <ol>
                            {study.sections.map((s, i) => (
                                <li key={s.id}>
                                    <a href={`#${s.id}`}>
                                        <span className="cs-num">{num(i)}</span>
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="cs-sections">
                        {study.sections.map((s, i) => (
                            <section key={s.id} id={s.id} className="cs-section">
                                <h2>
                                    <span className="cs-num">{num(i)}</span>
                                    {s.title}
                                </h2>
                                {s.blocks.map((b, j) => (
                                    <BlockView key={j} block={b} />
                                ))}
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
