import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Get stored credentials from localStorage, or null if not present
    const [authData, setAuthData] = useState(() => {
        const storedData = localStorage.getItem('authData');
        return storedData ? JSON.parse(storedData) : null;
    });

    // The login function now just saves the credentials to state and localStorage
    const login = (username, password) => {
        const newAuthData = { username, password };
        localStorage.setItem('authData', JSON.stringify(newAuthData));
        setAuthData(newAuthData);
    };

    const logout = () => {
        localStorage.removeItem('authData');
        setAuthData(null);
    };
    
    const isAuthenticated = !!authData;

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};