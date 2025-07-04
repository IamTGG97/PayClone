import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WalletPage from './pages/WalletPage';

function App(){
  return (
    <Router>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/wallet">Wallet</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wallet" element={<WalletPage />} />
      </Routes>
    </Router>
  );
}

export default App;