import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    api.get('/courses/list/') 
        .then(res => {
            console.log("Course Data:", res.data);
            
            setCourses(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error:", err);
            setLoading(false);
        });
}, []);

    if (loading) return <h2>Loading Courses...</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Available Courses</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {courses.map(course => (
                    <div key={course.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <h3>{course.title}</h3>
                        <p>{course.description.substring(0, 100)}...</p>
                        <p><strong>Price:</strong> ${course.price}</p>
                        <Link to={`/courses/${course.id}`} style={{ color: '#007bff' }}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;