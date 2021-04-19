import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Display from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [ search, setSearch ] = useState('')

  const hook = () => {
    console.log('effect')
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
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
      <Display countries={countries} filteredCountries={countries} />
      
    </div>
  )
}

export default App;
