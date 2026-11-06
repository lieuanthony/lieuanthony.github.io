import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import ProjectDetail from "./ProjectDetail";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./App.css";

function Main() {
    // Arriving from a project page, jump straight to the section in the link (e.g. /#projects),
    // not wherever the last page was scrolled to. Only on arrival: the nav's own links scroll smoothly.
    const { hash } = useLocation();
    useLayoutEffect(() => {
        const target = hash ? document.getElementById(hash.slice(1)) : null;
        if (target) target.scrollIntoView({ behavior: "instant" as ScrollBehavior });
        else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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