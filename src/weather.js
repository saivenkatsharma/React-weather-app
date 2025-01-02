import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeather = async () => {
        const apiKey = 'e9ea2f6490a71bf5e93b8fcc51b74250';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json(); // Fix: Properly parse JSON
            if (data.cod === 200) { // Fix: Correctly reference `data` and use `===` for comparison
                setWeatherData(data); // Fix: Correct function name and argument
            } else {
                alert('City not found');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData({ error: "Unable to fetch weather" }); // Fix: Properly set the error state
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {weatherData?.error ? (
                <p>{weatherData.error}</p>
            ) : (
                weatherData && (
                    <div>
                        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                        <p>Temperature: {weatherData.main.temp}°C</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p>Last updated: {new Date(weatherData.dt * 1000).toLocaleString()}</p>
                        <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                        <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                        <p>Feels Like: {weatherData.main.feels_like}°C</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt={weatherData.weather[0].description}
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default Weather;
