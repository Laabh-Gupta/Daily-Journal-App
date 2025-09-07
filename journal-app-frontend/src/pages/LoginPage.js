import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import api service
import './AuthForm.css'; // <-- Import the shared form CSS

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Step 1: Save the credentials using the new login function
        auth.login(username, password);

        // Step 2: Make a test API call to see if the credentials are valid
        try {
            // We use a "setTimeout" to ensure the new auth header is ready
            setTimeout(async () => {
                await api.getJournalEntries(); // Or any other protected endpoint
                navigate('/dashboard');
            }, 0);
        }
        catch (error) {
            // Check if the error was specifically a 401 Unauthorized error
            if (error.response && error.response.status === 401) {
                alert('Login Failed! Check credentials.');
                auth.logout(); // Clear the bad credentials
            } else {
                // For any other error (like a network timeout), show a different message
                // or if you've made the backend fix, this part won't even be reached
                // for new users.
                alert('An unexpected error occurred. Please try again.');
                auth.logout();
            }
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                </div>
                <div className="input-group">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                <button type="submit" className="auth-button">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;