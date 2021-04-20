import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Display from './components/Display'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ weather, setWeather ] = useState(null)

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        if (search !== '') {
          const filteredCountries = response.data.filter(country => 
            country.name.toLowerCase().includes(`${search}`.toLowerCase())
            )
            setCountries(filteredCountries)
        }
      })
  }
  useEffect(hook, [search])

  // Problem: When only one country, if I delete letters from the search, the search still triggers the API until search results are more than one country.
  // If current searched country doesn't equal displayed country, run axios.
  // setDisplayed? if countries === 1 && displayed != countries 
  // Maybe answer in 2.d.Changing the Importance of Notes
  const weatherHook = () => {
    const api_key = process.env.REACT_APP_WEATHERSTACK_KEY
    if (countries.length === 1) {
      const capital = countries.map(country => country.capital)
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}&units=f`)
      .then(response => {
        setWeather(response.data.current)
      })
    }
  }
  useEffect(weatherHook, [countries])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleButtonClick = (countryName) => {
    setSearch(countryName)
  }


  return (
    <div>
      <form>
        <div>
          <span>Filter countries with: </span>
          <input 
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </form>

      <h2>Countries</h2>
      <Display 
        countries={countries} 
        filteredCountries={countries}
        handleButtonClick={handleButtonClick}
        weather={weather} />
      
    </div>
  )
}

export default App;
