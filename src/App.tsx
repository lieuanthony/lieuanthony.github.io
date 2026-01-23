import { useState, useEffect } from "react";
import About from "./About"
import Projects from "./Projects"
import "./App.css";

export default function App() {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div id="app">
      <About />
      <Projects />
      <footer id="foot">
        <p>Portfolio made by Anthony Lieu</p>
      </footer>
    </div>
  );
}