import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState(''); // City name ke liye state
  const [weatherData, setWeatherData] = useState(null); // Weather data ke liye state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error handling ke liye state

  // OpenWeatherMap API Key
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY; // Apna API key yahan daalein
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log("API Key:", apiKey);
console.log("API URL:", apiUrl);

  // Function to fetch weather data
  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message || 'City not found. Please try again.');
        setWeatherData(null);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch weather data when city changes
  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;