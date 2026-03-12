import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import ProjectDetail from "./ProjectDetail";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./App.css";

function Main() {
    return (
        <>
            <Navbar />
            <div id="app">
                <About />
                <Experience />
                <Projects />
            </div>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
            </Routes>
        </BrowserRouter>
    );
}