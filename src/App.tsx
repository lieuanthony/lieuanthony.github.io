import React, { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState([
    { id: "main", legend: "About", content: "about" },
    { id: "small1", legend: "Experience", content: "experience" },
    { id: "small2", legend: "Projects", content: "projects" },
    { id: "small3", legend: "Now Playing", content: "spotify" },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<{ [key: string]: DOMRect }>({});
  const progressRef = useRef<HTMLDivElement>(null);

  const renderContent = (content: string, isLarge: boolean) => {
    const catAscii = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣀⡀⡠⠔⠒⠐⠉⠙⣆⠀⠀⠀⡀⠀⠀
⠀⠀⠀⠀⣮⠀⠀⠀⠀⠀⠀⠀⠀⠡⡀⠀⠐⠿⠃⠀
⠀⣄⠀⠀⢸⠀⢀⡀⠀⠸⠀⠘⡃⠠⣳⣖⠀⢀⣦⣀
⠈⠻⠉⠀⣿⣤⢘⠉⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⠙⠀
⢼⡦⠀⢊⢿⡋⠀⠀⠀⡴⢴⠒⠄⠀⠘⢄⢠⠛⡄⠀
⠀⠁⠀⠀⠀⠉⢱⠂⠀⠀⠺⠂⠀⠀⠀⠀⢻⣰⠁⠀
⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠘⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

    switch (content) {
      case "about":
        return (
          <div className="tui-container">
            <div className="ascii-art-banner">
              <pre>{catAscii}</pre>
            </div>
            <div className="tui-header">
              <span className="tui-prompt">-{'>'} ~</span>
              <span className="tui-command">cat about.txt</span>
            </div>
            <div className="tui-content">
              <p className="tui-line">
                <span className="tui-label">BIO:</span>
              </p>
              <p className="tui-line tui-text">
                Hi! My name is Anthony Lieu, and I am a third-year student studying Software Engineering at RIT.
                I enjoy all things problem-solving from coding, to playing video games, and to bouldering.
                I am currently looking for an internship related to Fullstack Engineering in the Summer/Fall of 2026.
              </p>
              <p className="tui-line">
                <p className="tui-spacing"></p>
                <span className="tui-label">LINKS:</span>
              </p>
              <p className="tui-line">
                <a className="tui-text" href="/assets/Lieu_Anthony_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                <span className="pipe">|</span>
                <a className="tui-text" href="https://www.linkedin.com/in/lieuanthony/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <span className="pipe">|</span>
                <a className="tui-text" href="https://github.com/lieuanthony" target="_blank" rel="noopener noreferrer">GitHub</a>
              </p>
            </div>
          </div>
        );
      case "experience":
        return <div className="placeholder-text">Experience Content</div>;
      case "projects":
        return <div className="placeholder-text">Projects & Skills Content</div>;
      default:
        return null;
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: "100%",
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(".loading-screen", {
              opacity: 0,
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => setLoading(false),
            });
          },
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const recordPositions = () => {
    const newPositions: { [key: string]: DOMRect } = {};
    const nodes = containerRef.current?.querySelectorAll("[data-box-id]")!;
    nodes.forEach((node) => {
      const id = node.getAttribute("data-box-id")!;
      newPositions[id] = node.getBoundingClientRect();
    });
    positionsRef.current = newPositions;
  };

  const animateToNewPositions = () => {
    const nodes = containerRef.current?.querySelectorAll("[data-box-id]")!;
    nodes.forEach((node) => {
      const id = node.getAttribute("data-box-id")!;
      const prev = positionsRef.current[id];
      const next = node.getBoundingClientRect();
      if (!prev) return;

      const dx = prev.left - next.left;
      const dy = prev.top - next.top;
      const dw = prev.width / next.width;
      const dh = prev.height / next.height;

      gsap.fromTo(
        node,
        { x: dx, y: dy, scaleX: dw, scaleY: dh },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    });
  };

  const swap = (index: number) => {
    recordPositions();
    setBoxes((prev) => {
      const arr = [...prev];
      const temp = arr[0];
      arr[0] = arr[index];
      arr[index] = temp;
      return arr;
    });
  };

  useLayoutEffect(() => {
    animateToNewPositions();
  }, [boxes]);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <div className="loading-bar">
            <div ref={progressRef} className="loading-progress"></div>
          </div>
        </div>
      )}

      <div ref={containerRef} className="app-container">
        <div
          data-box-id={boxes[0].id}
          onClick={() => swap(0)}
          className="main-box"
        >
          <fieldset className="box-fieldset">
            <legend className="box-legend">{boxes[0].legend}</legend>
            <div className="box-content">{renderContent(boxes[0].content, true)}</div>
          </fieldset>
        </div>

        <div className="right-column">
          {boxes.slice(1).map((box, i) => {
            const isSpotify = i === 2;

            return (
              <div
                key={box.id}
                data-box-id={box.id}
                onClick={isSpotify ? undefined : () => swap(i + 1)}
                className="small-box"
              >
                {isSpotify ? (
                  <fieldset className="spotify-fieldset">
                    <legend className="spotify-legend">{box.legend}</legend>
                    <iframe
                      title="spotify"
                      className="spotify-embed"
                      data-testid="embed-iframe"
                      src="https://open.spotify.com/embed/playlist/4NDB13xo40yX307PgxGf5U?utm_source=generator"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </fieldset>
                ) : (
                  <fieldset className="box-fieldset">
                    <legend className="box-legend">{box.legend}</legend>
                    <div className="box-content">{renderContent(box.content, false)}</div>
                  </fieldset>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}