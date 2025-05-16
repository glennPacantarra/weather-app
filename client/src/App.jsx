import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch suggestions
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (city.length > 1) {
        fetch(`http://api.weatherapi.com/v1/search.json?key=YOUR_API_KEY&q=${city}`)
          .then(res => res.json())
          .then(data => setSuggestions(data))
          .catch(err => console.error(err));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [city]);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    const res = await fetch(`http://192.168.1.5:5000/api/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
    setLoading(false);
    setSuggestions([]);
  };

  const handleSelectSuggestion = (name) => {
    setCity(name);
    setSuggestions([]);
  };

  return (
    <div className="app">
      <h1> Bebu's Weather App</h1>
      <p> ❤️  I Love You ❤️</p>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="suggestion-box">
            {suggestions.map((s, index) => (
              <li key={index} onClick={() => handleSelectSuggestion(s.name)}>
                {s.name}, {s.country}
              </li>
            ))}
          </ul>
        )}
        <button type="button" onClick={fetchWeather} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      {weather && !loading && (
        <div className="weather-card">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <img src={weather.current.condition.icon} alt="weather-icon" />
          <p>{weather.current.condition.text}</p>
          <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
          <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
          <p><strong>Wind:</strong> {weather.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default App;
