import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import Home from './components/Home';
import api from './services/api';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await api.get('/auth/check-session');
                setIsAuthenticated(response.data.authenticated);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkSession();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                <Route 
                    path="/tasks" 
                    element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="*" 
                    element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
