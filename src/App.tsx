import React, { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState([
    { id: "main" },
    { id: "small1" },
    { id: "small2" },
    { id: "small3" },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<{ [key: string]: DOMRect }>({});
  const progressRef = useRef<HTMLDivElement>(null);

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
        <div data-box-id={boxes[0].id} onClick={() => swap(0)} className="main-box">
          {boxes[0].id}
        </div>

        <div className="right-column">
          {boxes.slice(1).map((box, i) => (
            <div
              key={box.id}
              data-box-id={box.id}
              onClick={i === 2 ? undefined : () => swap(i + 1)}
              className="small-box"
            >
              {i === 2 ? (
                <iframe
                  data-testid="embed-iframe"
                  style={{ borderRadius: "10px", width: "100%", height: "100%" }}
                  src="https://open.spotify.com/embed/playlist/4NDB13xo40yX307PgxGf5U?utm_source=generator"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              ) : (
                box.id
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}