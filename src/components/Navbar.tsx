import { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsTransparent(currentScrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isTransparent ? 'transparent' : ''}`}>
      <nav className="navbar-container">
        <h1 className="navbar-brand">
          <a href="/">Anthony Lieu</a>
        </h1>
        <ul className="navbar-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;