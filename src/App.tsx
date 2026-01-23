import About from "./About"
import Projects from "./Projects"
import "./App.css";

export default function App() {

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