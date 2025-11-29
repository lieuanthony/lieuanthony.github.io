import React, { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState([
    { id: "main", legend: "About Me", content: "about" },
    { id: "small1", legend: "Experience", content: "experience" },
    { id: "small2", legend: "Projects & Skills", content: "projects" },
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
        // When large, show full content with banner
        return (
          <div className="tui-container">
            <div className="ascii-art-banner">
              <pre>{catAscii}</pre>
            </div>
            <div className="tui-header">
              <span className="tui-prompt">user@portfolio:~$</span>
              <span className="tui-command">cat about.txt</span>
            </div>
            <div className="tui-content">
              <p className="tui-line">
                <span className="tui-label">NAME:</span> Your Name
              </p>
              <p className="tui-line">
                <span className="tui-label">ROLE:</span> Software Engineer | Full Stack Developer
              </p>
              <p className="tui-line">
                <span className="tui-label">LOCATION:</span> San Francisco, CA
              </p>
              <p className="tui-line tui-spacing"></p>
              <p className="tui-line">
                <span className="tui-label">BIO:</span>
              </p>
              <p className="tui-line tui-text">
                Passionate software engineer with expertise in building
              </p>
              <p className="tui-line tui-text">
                modern web applications. I love creating elegant solutions
              </p>
              <p className="tui-line tui-text">
                to complex problems and learning new technologies.
              </p>
              <p className="tui-line tui-spacing"></p>
              <p className="tui-line">
                <span className="tui-label">INTERESTS:</span> AI/ML, Web3, Open Source
              </p>
              <p className="tui-line">
                <span className="tui-label">EMAIL:</span> your.email@example.com
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