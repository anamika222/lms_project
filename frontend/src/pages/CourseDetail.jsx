import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CourseDetail = () => {
    const { id } = useParams(); 
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

useEffect(() => {
    const fetchCourse = async () => {
        try {
            const token = localStorage.getItem('access_token');
            
          
            const res = await api.get(`/courses/list/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            console.log("Course Data Received:", res.data);
            setCourse(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Detail Error:", err.response?.data);
            setLoading(false);
        }
    };

   
    if (id && id !== ':id') {
        fetchCourse();
    } else {
        console.warn("Invalid ID found in URL:", id);
    }
}, [id]);

    const handleEnroll = () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert("Please login first to enroll!");
            navigate('/login');
            return;
        }

     
        api.post('/courses/enrollments/', { course: id }) 
            .then(res => {
                alert("Successfully enrolled in this course!");
                navigate('/dashboard');
            })
            .catch(err => {
                alert(err.response?.data?.non_field_errors || "Already enrolled or Error occurred!");
            });
    };

    if (loading) return <h2>Loading Course Details...</h2>;
    if (!course) return <h2>Course not found!</h2>;

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto', textAlign: 'left', border: '1px solid #ddd', borderRadius: '10px' }}>
            <h1>{course.title}</h1>
            <p style={{ fontSize: '18px', color: '#555' }}>{course.description}</p>
            <hr />
            <p><strong>Category:</strong> {course.category_name || "General"}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            
          
            <button 
                onClick={handleEnroll} 
                style={{ 
                    padding: '12px 25px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer', 
                    fontSize: '16px',
                    fontWeight: 'bold' 
                }}
            >
                Enroll Now
            </button>
        </div>
    );
};

export default CourseDetail;