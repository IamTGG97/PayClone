import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar(){
    return (
        <nav className="navbar">
            <h1 className="navbar-title">PayClone</h1>
            <div className="navbar-links">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/wallet">Wallet</Link>
            </div>
        </nav>
    );
}

export default Navbar;