import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './Navbar.css';
import { jwtDecode } from 'jwt-decode';

function Navbar(){
//const name = localStorage.getItem('name');
    const [firstName, setFirstName] = useState('');
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const fullName = decoded.name || '';
        setFirstName(fullName.split(' ')[0]);
      } catch (error) {
        console.error('Token decoding failed', error);
      }
    }
  }, []);
    return (
        
        <nav className="navbar">
            <h1 className="navbar-title">PayClone</h1>
            {firstName && <span className="navbar-welcome">Welcome, {firstName}!</span>}
            <div className="navbar-links">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/wallet">Wallet</Link>
                <Link to="/transfer">Transfer</Link>
                <Link to="/history">History</Link>
            </div>
        </nav>
    );
}

export default Navbar;