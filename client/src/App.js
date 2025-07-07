import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WalletPage from './pages/WalletPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';


function privateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}
function App(){
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/wallet" element={<PrivateRoute><WalletPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;