import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // <-- Import Navbar CSS

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">MyJournal</Link>
            <div className="nav-links">
                {isAuthenticated ? (
                    <NavLink to="/dashboard">Dashboard</NavLink>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                )}
            </div>
            {isAuthenticated && (
                <div className="nav-actions">
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;