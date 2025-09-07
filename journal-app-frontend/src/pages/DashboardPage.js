import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function DashboardPage() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await api.getJournalEntries();
            setEntries(response.data);
        } catch (error) {
            console.error("Failed to fetch entries:", error);
            setEntries([]); // Clear entries on error (e.g. 404 Not Found)
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            try {
                await api.deleteJournalEntry(id);
                fetchEntries(); // Refresh the list
            } catch (error) {
                console.error("Failed to delete entry:", error);
            }
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>My Journal</h2>
                <a href="/journal/new" className="create-entry-btn">Create New Entry</a>
            </div>
            {entries.length === 0 ? (
                <p>No entries yet. Create one!</p>
            ) : (
                <div className="journal-grid">
                    {entries.map(entry => (
                        <article key={entry.id} className="journal-card">
                            <h3>{entry.title}</h3>
                            <p>{entry.content}</p>
                            <div className="card-actions">
                                <a href={`/journal/edit/${entry.id}`} className="edit-btn">Edit</a>
                                <button onClick={() => handleDelete(entry.id)} className="delete-btn">Delete</button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DashboardPage;