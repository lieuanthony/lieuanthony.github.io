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
                        working on <mark>OpenShift</mark> platform tooling. After I graduate, I'm looking
                        for a <mark>full-time role</mark>.
                    </p>
                </div>
                <img id="hirono-img" src="/assets/images/hirono.png" alt="Hirono" />
            </div>
        </section>
    );
}
