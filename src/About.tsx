import "./About.css";

export default function About() {
    return (
        <section id="about">
            <div id="about-inner">
                <div id="about-text">
                    <p id="about-eyebrow">Software Engineering at RIT · Graduating Summer 2027</p>
                    <h1 id="name">Hi, I'm Anthony Lieu.</h1>
                    <p id="bio">
                        I enjoy all things problem-solving, from coding to playing video games and bouldering.
                        I'm especially interested in building web applications with <mark>cloud technologies</mark> to
                        create scalable and reliable systems. Right now I'm a Software Engineer Co-op at <mark>Paychex</mark>,
                        working on <mark>OpenShift</mark> platform tooling.
                    </p>
                    <div id="about-actions">
                        <a className="about-button" href="#projects">
                            See my work ↓
                        </a>
                        <a className="about-link" href="#contact">
                            Get in touch
                        </a>
                    </div>
                </div>
                <img id="hirono-img" src="/assets/images/hirono.png" alt="Hirono" />
            </div>
        </section>
    );
}
