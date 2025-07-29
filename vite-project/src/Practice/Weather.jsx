import React, { useState} from 'react'
import axios from 'axios';

const Weather = () => {
    // State to hold weather data
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");


    
    async function fetchWeather() {

      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=f7aa2ed2abac4ca0963141026252706&q=${city}`   
        );
        setWeatherData(response.data.location);
      }
        catch (error) {
        console.error("Error fetching weather data:", error);
        }

    }



  return (
    <div>
        <h1>Weather App</h1>
        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter city name" />
        <button onClick={fetchWeather}>Get Weather</button>
        {weatherData && (
            <div>   
                <h2>Weather in {weatherData.name}</h2>
                <p>Region: {weatherData.region}</p>
                <p>Country: {weatherData.country}</p>
                <p>Latitude: {weatherData.lat}</p>
            </div>
        )}
    </div>
  )
}


export default Weather