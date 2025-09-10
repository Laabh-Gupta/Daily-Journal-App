// src/components/WeatherWidget.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './WeatherWidget.css'; // We will create this file next

const WeatherWidget = ({ city }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await api.getWeather(city);
                setWeather(response.data);
                setError(null);
            } catch (err) {
                setError('Could not fetch weather.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) {
        return <div className="weather-widget loading">Loading weather...</div>;
    }

    if (error) {
        return <div className="weather-widget error">{error}</div>;
    }

    return (
        <div className="weather-widget">
            <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="weather-icon"
            />
            <div className="weather-details">
                <span className="weather-temp">{weather.temperature}°C</span>
                <span className="weather-desc">{weather.description}</span>
                <span className="weather-city">{weather.city}</span>
            </div>
        </div>
    );
};

export default WeatherWidget;