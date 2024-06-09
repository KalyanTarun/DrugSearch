import React from 'react';
import '../styles/NavBar.css';

// Atomic component which shows the TopBar for the application.
const NavBar = ({title}) => (
    <nav className="navbar">
        <h1 className="title">{title}</h1>
    </nav>
);

export default NavBar;
