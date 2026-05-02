import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            const res = await api.post('/users/login/', credentials);
            
           
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            
            alert("Login Successful!");
            
            
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Invalid Credentials or Server Error");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={credentials.username}
                    onChange={e => setCredentials({...credentials, username: e.target.value})} 
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <br/>
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={credentials.password}
                    onChange={e => setCredentials({...credentials, password: e.target.value})} 
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <br/>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;