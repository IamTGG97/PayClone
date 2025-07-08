import React, {useState} from 'react';
import { loginUser } from '../services/api';
import '../App.css';
import { useNavigate} from 'react-router-dom';


function LoginPage() {
    const navigate = useNavigate();
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
            localStorage.setItem('name', res.data.user.name);
            alert('Login was successful');
            navigate('/wallet');
        } catch (err) {
            setError(err.response.data.message || 'Login failed');
        }
    }
    return (
    <div className="container">
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