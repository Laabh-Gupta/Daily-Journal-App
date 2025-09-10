import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/journal', // Your Spring Boot backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// This interceptor now creates the Basic Auth header for every request
apiClient.interceptors.request.use(config => {
    const authDataString = localStorage.getItem('authData');
    if (authDataString) {
        const authData = JSON.parse(authDataString);
        const encodedCredentials = btoa(`${authData.username}:${authData.password}`);
        config.headers.Authorization = `Basic ${encodedCredentials}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default {
    // Public routes
    register(user) {
        return apiClient.post('/public/create-user', user);
    },
    // The separate login API call is no longer needed with Basic Auth

    // Journal routes - these will now automatically have the Basic Auth header
    getJournalEntries() {
        return apiClient.get('/journal');
    },
    getJournalEntryById(id) {
        return apiClient.get(`/journal/id/${id}`);
    },
    createJournalEntry(entry) {
        return apiClient.post('/journal', entry);
    },
    updateJournalEntry(id, entry) {
        return apiClient.put(`/journal/id/${id}`, entry);
    },
    deleteJournalEntry(id) {
        return apiClient.delete(`/journal/id/${id}`);
    },
    // src/services/api.js

    // ... inside the export default { ... }
    getJournalEntries() {
        return apiClient.get('/journal');
    },

    // ADD THIS NEW FUNCTION
    getWeather(city) {
        return apiClient.get(`/weather/${city}`);
    }
};