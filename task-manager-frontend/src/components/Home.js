import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ isAuthenticated }) {
    return (
        <div className="home">
            <h1 className="home-title">Welcome to the Futuristic Task Manager</h1>
            <p className="home-description">Manage your tasks with a modern, sleek interface.</p>
            <div className="home-buttons">
                {isAuthenticated ? (
                    <Link to="/tasks" className="home-button">Go to Tasks</Link>
                ) : (
                    <>
                        <Link to="/register" className="home-button">Register</Link>
                        <Link to="/login" className="home-button">Login</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
