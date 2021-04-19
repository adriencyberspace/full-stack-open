import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Display from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [ search, setSearch ] = useState('')
  const [ weather, setWeather ] = useState('')

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

  const weatherHook = () => {
    const api_key = process.env.REACT_APP_WEATHERSTACK_KEY
    if (countries.length === 1) {
      const capital = countries.map(country => country.capital)
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}&units=f`)
      .then(response => {
        setWeather(response.data)
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
          Filter countries with: 
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
