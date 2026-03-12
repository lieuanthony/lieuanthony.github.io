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
                        I'm a 3rd-year student studying <mark>Software Engineering</mark> at RIT.
                        I enjoy all things problem-solving, from coding to playing video games and bouldering.
                        I'm especially interested in building web applications using <mark>cloud technologies</mark> to create scalable and reliable systems.
                        I'm currently looking for an internship related to <mark>backend development</mark> in the <mark>Summer/Fall of 2026</mark>.
                    </p>
                </div>
            </div>
        </section>
    );
}