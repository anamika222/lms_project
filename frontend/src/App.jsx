import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import CourseList from './pages/CourseList'; 
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import CourseDetail from './pages/CourseDetail';

function App() {
  const logoutLinkStyle = { 
    color: '#ffffff', 
    backgroundColor: '#dc3545', 
    padding: '5px 12px', 
    borderRadius: '4px', 
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  return (
    <Router>
      <div style={{ 
        minHeight: '100vh', 
        width: '100vw', 
        backgroundColor: '#ffffff', 
        color: '#000000',
        position: 'relative',
        zIndex: 1
      }}>
        <nav style={{ 
          padding: '20px', 
          background: '#f8f9fa', 
          borderBottom: '1px solid #ddd', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Home</Link>
          <Link to="/courses" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Courses</Link>
          <Link to="/register" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Register</Link>
          <Link to="/login" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
          <Link to="/dashboard" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/profile" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Profile</Link>
          <Link to="/courses" style={{ color: '#007bff', fontWeight: 'bold' }}>All Courses</Link>
          
          <Link to="/logout" style={logoutLinkStyle}>Logout</Link>
        </nav>

        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Routes>
            <Route path="/" element={<h1>Welcome to LMS</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<CourseList />} />  
            
            <Route path="/courses/:id" element={<CourseDetail />} />
            
            <Route path="/logout" element={<Logout />} />

            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;