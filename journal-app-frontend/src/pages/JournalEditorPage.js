import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import './AuthForm.css';

function JournalEditorPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Gets the 'id' from the URL

    const isEditing = id !== undefined;

    useEffect(() => {
        if (isEditing) {
            api.getJournalEntryById(id)
                .then(response => {
                    setTitle(response.data.title);
                    setContent(response.data.content);
                })
                .catch(error => console.error("Error fetching entry:", error));
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const entryData = { title, content };
        try {
            if (isEditing) {
                await api.updateJournalEntry(id, entryData);
            } else {
                await api.createJournalEntry(entryData);
            }
            navigate('/dashboard');
        } catch (error) {
            console.error("Failed to save entry:", error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                 <h2>{isEditing ? 'Edit Entry' : 'Create New Entry'}</h2>
                 <div className="input-group">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                 </div>
                 <div className="input-group">
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Your thoughts..." required></textarea>
                 </div>
                 <button type="submit" className="auth-button">Save Entry</button>
            </form>
        </div>
    );
}

export default JournalEditorPage;