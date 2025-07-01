import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);
  const handleClose = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Bus Tracker</a>
      </div>
      <button
        className={`navbar-toggle${menuOpen ? ' open' : ''}`}
        aria-label="Toggle navigation menu"
        onClick={handleToggle}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className={`navbar-links${menuOpen ? ' active' : ''}`}>
        {menuOpen && (
          <button className="navbar-close" aria-label="Close menu" onClick={handleClose}>&times;</button>
        )}
        <li><a href="/" onClick={handleLinkClick}>Home</a></li>
        <li><a href="/admin" onClick={handleLinkClick}>Admin Panel</a></li>
        <li><a href="/user" onClick={handleLinkClick}>User Panel</a></li>
        <li><a href="/register-bus" onClick={handleLinkClick}>Register Bus</a></li>
      </ul>
    </nav>
  );
};

export default Navbar; 