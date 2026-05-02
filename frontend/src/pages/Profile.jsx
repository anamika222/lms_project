import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        full_name: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {

        api.get('/users/profile/') 
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Profile fetch error:", err);
                setMessage('Failed to load profile. Please login again.');
                setLoading(false);
            });
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        api.patch('/users/profile/', user)
            .then(res => setMessage('Profile updated successfully!'))
            .catch(err => {
                console.error(err);
                setMessage('Update failed! Check if you are logged in.');
            });
    };

    if (loading) return <p style={{ textAlign: 'center' }}>Loading profile...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ccc', borderRadius: '10px', marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>User Profile</h2>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red', textAlign: 'center' }}>{message}</p>}
            
            <form onSubmit={handleUpdate}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={user.username} 
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Full Name:</label>
                    <input 
                        type="text" 
                        value={user.full_name || ''} 
                        onChange={(e) => setUser({...user, full_name: e.target.value})}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;