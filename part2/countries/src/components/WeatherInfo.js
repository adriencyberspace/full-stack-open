import React from 'react'

const WeatherInfo = ({ country, weather}) => {
  // Conditional to display weather API data without crashing
  if (weather) {
    return (
      <div>
        <h4>Weather in {country.capital}:</h4>
        <div><strong>Temperature: </strong> {weather.temperature}° Fahrenheit</div>
        <img style={{ maxWidth: 250 }} src={weather.weather_icons[0]} alt={`${country.name} weather`}></img>
        <div><strong>Wind: </strong>{weather.wind_speed} mph {weather.wind_dir}</div>
      </div>
    )
  } else {
    return <div>Loading weather...</div>
  }
}

export default WeatherInfo