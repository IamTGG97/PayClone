import React, {useState} from 'react';
import { loginUser } from '../services/api';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);//calls backend
            localStorage.setItem('token', res.data.token);
            alert('Login was successful');
        } catch (err) {
            setError(err.response.data.message || 'Login failed');
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

export default LoginPage;