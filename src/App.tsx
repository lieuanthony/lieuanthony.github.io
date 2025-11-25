import React, { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import "./App.css";

gsap.registerPlugin(Draggable);

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

  /** Record current positions (FLIP) */
  const recordPositions = () => {
    const pos: { [key: string]: DOMRect } = {};
    const nodes = containerRef.current?.querySelectorAll("[data-box-id]");
    nodes?.forEach((node) => {
      const id = node.getAttribute("data-box-id")!;
      pos[id] = node.getBoundingClientRect();
    });
    positionsRef.current = pos;
  };

  /** Animate boxes from old → new positions */
  const animateToNewPositions = () => {
    const nodes = containerRef.current?.querySelectorAll("[data-box-id]");
    nodes?.forEach((node) => {
      const id = node.getAttribute("data-box-id")!;
      
      // Skip animation for the box that was just dropped
      if (id === skipAnimationRef.current) {
        gsap.set(node, { x: 0, y: 0 });
        return;
      }
      
      const prev = positionsRef.current[id];
      const next = node.getBoundingClientRect();
      if (!prev) return;

      gsap.fromTo(
        node,
        { x: prev.left - next.left, y: prev.top - next.top },
        { x: 0, y: 0, duration: 0.35, ease: "power2.out" }
      );
    });
    
    skipAnimationRef.current = null;
  };

  /** Reorder: move draggedId to targetId's position, shift others */
  const reorder = (draggedId: string, targetId: string) => {
    recordPositions();

    setBoxes((prev) => {
      const arr = [...prev];
      const draggedIndex = arr.findIndex((b) => b.id === draggedId);
      const targetIndex = arr.findIndex((b) => b.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
        return arr;
      }

      // Remove dragged item
      const [draggedItem] = arr.splice(draggedIndex, 1);
      // Insert at target position
      arr.splice(targetIndex, 0, draggedItem);

      return arr;
    });
  };

  /** Create draggable objects for all boxes */
  const createDraggables = () => {
    const nodes = containerRef.current?.querySelectorAll("[data-box-id]");
    if (!nodes) return;

    // Cleanup old draggables
    Object.values(draggablesRef.current).forEach((arr) =>
      arr.forEach((d) => d.kill())
    );
    draggablesRef.current = {};

    nodes.forEach((node) => {
      const id = node.getAttribute("data-box-id")!;
      let hoverTarget: string | null = null;
      let placeholderElement: HTMLDivElement | null = null;
      let originalPositions: { [key: string]: DOMRect } = {};
      let previewOrder: string[] = [];

      draggablesRef.current[id] = Draggable.create(node, {
        type: "x,y",
        bounds: containerRef.current!,
        edgeResistance: 0.75,
        inertia: true,

        onDragStart() {
          gsap.to(node, { scale: 1.05, duration: 0.15, zIndex: 1000 });
          hoverTarget = null;
          placeholderElement = null;
          previewOrder = [];
          
          // Store original positions of ALL boxes before any transforms
          originalPositions = {};
          const allNodes = containerRef.current?.querySelectorAll("[data-box-id]");
          allNodes?.forEach((n) => {
            const nId = n.getAttribute("data-box-id")!;
            originalPositions[nId] = n.getBoundingClientRect();
          });
        },

        onDrag() {
          const rect = node.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Check collision against ORIGINAL positions (before any transforms)
          let currentTarget: string | null = null;

          Object.entries(originalPositions).forEach(([otherId, otherRect]) => {
            if (otherId === id) return;
            
            const zone = {
              left: otherRect.left - 40,
              right: otherRect.right + 40,
              top: otherRect.top - 40,
              bottom: otherRect.bottom + 40,
            };

            const inside =
              centerX >= zone.left &&
              centerX <= zone.right &&
              centerY >= zone.top &&
              centerY <= zone.bottom;

            if (inside) {
              currentTarget = otherId;
            }
          });

          // Entering a new target
          if (currentTarget && currentTarget !== hoverTarget) {
            // Remove old placeholder
            if (placeholderElement) {
              placeholderElement.remove();
              placeholderElement = null;
            }

            // Reset all boxes to original positions first
            const allNodes = containerRef.current?.querySelectorAll("[data-box-id]");
            allNodes?.forEach((n) => {
              const nId = n.getAttribute("data-box-id")!;
              if (nId !== id) {
                gsap.to(n, {
                  x: 0,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            });

            hoverTarget = currentTarget;

            // Calculate preview order
            const currentOrder = boxes.map(b => b.id);
            const draggedIndex = currentOrder.indexOf(id);
            const targetIndex = currentOrder.indexOf(currentTarget);
            
            previewOrder = [...currentOrder];
            previewOrder.splice(draggedIndex, 1);
            previewOrder.splice(targetIndex, 0, id);

            // Create placeholder at target's ORIGINAL position
            const targetOriginalRect = originalPositions[currentTarget];
            
            if (targetOriginalRect) {
              const containerRect = containerRef.current!.getBoundingClientRect();

              placeholderElement = document.createElement("div");
              placeholderElement.className = "swap-placeholder";
              placeholderElement.style.position = "absolute";
              placeholderElement.style.left = `${targetOriginalRect.left - containerRect.left}px`;
              placeholderElement.style.top = `${targetOriginalRect.top - containerRect.top}px`;
              placeholderElement.style.width = `${targetOriginalRect.width}px`;
              placeholderElement.style.height = `${targetOriginalRect.height}px`;
              placeholderElement.style.border = "2px dashed rgba(255, 255, 255, 0.5)";
              placeholderElement.style.borderRadius = "16px";
              placeholderElement.style.pointerEvents = "none";
              placeholderElement.style.zIndex = "500";
              
              containerRef.current?.appendChild(placeholderElement);

              // Shift boxes between dragged and target
              previewOrder.forEach((boxId, newIndex) => {
                if (boxId === id) return; // Skip dragged box
                
                const boxNode = containerRef.current?.querySelector(
                  `[data-box-id="${boxId}"]`
                ) as HTMLElement;
                
                const oldIndex = currentOrder.indexOf(boxId);
                
                if (boxNode && oldIndex !== newIndex) {
                  // Get the position this box should move to
                  const targetPositionId = currentOrder[newIndex];
                  const targetPos = originalPositions[targetPositionId];
                  const currentPos = originalPositions[boxId];
                  
                  if (targetPos && currentPos) {
                    const deltaX = targetPos.left - currentPos.left;
                    const deltaY = targetPos.top - currentPos.top;

                    gsap.to(boxNode, {
                      x: deltaX,
                      y: deltaY,
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }
                }
              });
            }
          }
          // Left the target zone
          else if (!currentTarget && hoverTarget) {
            // Remove placeholder
            if (placeholderElement) {
              placeholderElement.remove();
              placeholderElement = null;
            }

            // Return all boxes to original positions
            const allNodes = containerRef.current?.querySelectorAll("[data-box-id]");
            allNodes?.forEach((n) => {
              const nId = n.getAttribute("data-box-id")!;
              if (nId !== id) {
                gsap.to(n, {
                  x: 0,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            });

            hoverTarget = null;
            previewOrder = [];
          }
        },

        onDragEnd() {
          gsap.to(node, { scale: 1, duration: 0.15, zIndex: 1 });

          // Remove placeholder
          if (placeholderElement) {
            placeholderElement.remove();
            placeholderElement = null;
          }

          if (!hoverTarget) {
            // Return to original position
            gsap.to(node, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
            return;
          }

          // Check if dropped in placeholder zone (using original positions)
          const rect = node.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const targetOriginalRect = originalPositions[hoverTarget];
          
          if (targetOriginalRect) {
            const placeholderZone = {
              left: targetOriginalRect.left - 40,
              right: targetOriginalRect.right + 40,
              top: targetOriginalRect.top - 40,
              bottom: targetOriginalRect.bottom + 40,
            };

            const droppedInPlaceholder =
              centerX >= placeholderZone.left &&
              centerX <= placeholderZone.right &&
              centerY >= placeholderZone.top &&
              centerY <= placeholderZone.bottom;

            if (droppedInPlaceholder) {
              // The dragged box should just settle into place, not animate
              skipAnimationRef.current = id;
              
              // Snap to placeholder position immediately
              const containerRect = containerRef.current!.getBoundingClientRect();
              const deltaX = targetOriginalRect.left - containerRect.left;
              const deltaY = targetOriginalRect.top - containerRect.top;
              
              const currentRect = node.getBoundingClientRect();
              const currentX = currentRect.left - containerRect.left;
              const currentY = currentRect.top - containerRect.top;
              
              const targetToReorder = hoverTarget; // Capture for closure
              
              gsap.to(node, {
                x: deltaX - currentX,
                y: deltaY - currentY,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                  // Confirm reorder after animation
                  reorder(id, targetToReorder);
                }
              });
            } else {
              // Revert all boxes
              const allNodes = containerRef.current?.querySelectorAll("[data-box-id]");
              allNodes?.forEach((n) => {
                gsap.to(n, {
                  x: 0,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              });
            }
          }
        },
      });
    });
  };

  /** Recreate draggable after every layout change */
  useLayoutEffect(() => {
    animateToNewPositions();
    createDraggables();
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
              onClick={i === 2 ? undefined : () => swap(i + 1)}     // ❌ small3 not clickable
              className="small-box"
              style={{ cursor: i === 2 ? "default" : "pointer" }}   // ❌ small3 no pointer cursor
            >
              {i === 2 ? (
                <iframe
                  data-testid="embed-iframe"
                  style={{ borderRadius: "12px", width: "100%", height: "100%" }}
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