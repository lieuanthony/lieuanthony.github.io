import "./About.css";

export default function About() {
    return (
        <section id="about">
            <div id="about-inner">
                <div id="about-left">
                    <img id="hirono-img" src="/assets/images/hirono.png" alt="Hirono" />
                </div>
                <div id="about-right">
                    <p id="name">Hi, I'm Anthony Lieu!</p>
                    <p id="bio">
                        I'm a student studying <mark>Software Engineering</mark> at RIT, graduating in <mark>Summer 2027</mark>.
                        I enjoy all things problem-solving, from coding to playing video games and bouldering.
                        I'm especially interested in building web applications using <mark>cloud technologies</mark> to create scalable and reliable systems.
                        I'm currently a Software Engineer Co-op at <mark>Paychex</mark>, working on <mark>OpenShift</mark> platform tooling and deployment automation.
                    </p>
                </div>
            </div>
        </section>
    );
}