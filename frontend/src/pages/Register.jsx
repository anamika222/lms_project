import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const handleRegister = async (data) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/users/register/', data);
        alert("Registration Successful!");
    } catch (err) {
        console.error(err.response.data);
    }
};

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'student' });
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/users/register/', {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role
        });
        alert("Registration Successful!");
        navigate('/login');
    } catch (err) {
      
        console.error("Registration Error Details:", err.response?.data);
        alert("Error in registration: " + JSON.stringify(err.response?.data || "Server connection failed"));
    }
};



    return (
        <div style={{ padding: '20px' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" required onChange={e => setFormData({...formData, username: e.target.value})} /><br/><br/>
                <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} /><br/><br/>
                <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} /><br/><br/>
                <select onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                </select><br/><br/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;