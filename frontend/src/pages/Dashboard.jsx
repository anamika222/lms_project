import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        alert("Logged out successfully!");
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        
        api.get('/users/admin-dashboard-summary/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            console.log("Backend Data:", res.data);
            setStats(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Dashboard Fetch Error:", err);
            setError(err.response?.data?.detail || "Failed to fetch dashboard data");
            setLoading(false);
        });
    }, []);

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}><h2>Loading Dashboard Summary...</h2></div>;

    if (error) return (
        <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
            <h2>Error: {error}</h2>
            <p>Please log out and log in again.</p>
            <button onClick={handleLogout} style={logoutButtonStyle}>Logout Now</button>
        </div>
    );

    return (
        <div style={{ padding: '30px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
           
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#333', margin: 0 }}>Admin Dashboard Summary</h2> 
                
            </div>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                
                <div style={cardStyle}>
                    <h3 style={{ color: '#555' }}>Total Users</h3>
                    <p style={numberStyle}>{stats?.total_users ?? 0}</p> 
                </div>

                
                <div style={cardStyle}>
                    <h3 style={{ color: '#555' }}>Total Courses</h3>
                    <p style={numberStyle}>{stats?.total_courses ?? 0}</p> 
                </div>

               
                <div style={cardStyle}>
                    <h3 style={{ color: '#555' }}>Enrollments</h3>
                    <p style={numberStyle}>{stats?.total_enrollments ?? 0}</p> 
                </div>
            </div>

           
            {stats?.role_wise && (
                <div style={{ marginTop: '30px', padding: '20px', background: '#fff', borderRadius: '8px' }}>
                    <h3>Role-wise User Count</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={listItemStyle}>Admins: <strong>{stats.role_wise.admin}</strong></li>
                        <li style={listItemStyle}>Instructors: <strong>{stats.role_wise.instructor}</strong></li>
                        <li style={listItemStyle}>Students: <strong>{stats.role_wise.student}</strong></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

// Styles
const cardStyle = { 
    background: '#fff', 
    padding: '25px', 
    borderRadius: '12px', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
    minWidth: '250px',
    textAlign: 'center'
};

const numberStyle = { fontSize: '32px', fontWeight: 'bold', color: '#007bff', margin: '10px 0' };

const logoutButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const listItemStyle = {
    padding: '8px 0',
    borderBottom: '1px solid #eee',
    fontSize: '16px'
};

export default Dashboard;