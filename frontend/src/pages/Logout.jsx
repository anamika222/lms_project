import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
       
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
       
        alert("Logged out successfully!");
        navigate('/login');
    };

    return (
        <button 
            onClick={handleLogout} 
            style={{
                padding: '10px 20px',
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
            }}
        >
            Logout
        </button>
    );
};

export default LogoutButton;