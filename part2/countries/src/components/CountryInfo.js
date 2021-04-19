import React from 'react'

const CountryInfo = ({ country, weather }) => {
  console.log(weather)
  
  return (
    <div>
      <div>
        <h2>{country.name}</h2>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h4>Languages:</h4>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
            )}
        </ul>
        <img style={{ maxWidth: 250 }} src={country.flag} alt={`${country.name} flag`}></img>
      </div>
      <h4>Weather in {country.capital}</h4>
      <div><strong>Temperature: </strong>{weather.current.temperature}° Fahrenheit</div>
      <img style={{ maxWidth: 250 }} src={weather.current.weather_icons[0]} alt={`${country.name} weather`}></img>
      <div><strong>Wind: </strong>{weather.current.wind_speed} mph {weather.current.wind_dir}</div>
    </div>
  )
}

export default CountryInfo