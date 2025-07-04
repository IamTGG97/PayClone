import React, { useState } from 'react';
import { registerUser } from '../services/api';

function RegisterPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(formData);
            localStorage.setItem('token', res.data.token);
            alert('Registration was successful');
        } catch (err) {
            setError(err.response.data.message || 'Registration failed');
        }
    }
    return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default RegisterPage;