import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Display = (props) => {
  // TODO: use SetCountries to filter result!! DUH

  if (props.countries.length > 10) {
    return <Error />
  } 

  if (props.countries.length === 1) {
    // TODO: Create Country and CountryInfo components
    return (
      <div>
        {props.countries.map(country => 
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
          )}
      </div>
    )
  }

    return (
    <div>
      <ul>
        {props.countries.map(country => 
          <li key={country.name}>{country.name}</li>
        )}
      </ul> 
    </div>
    )
}

const Error = () => {
  return <div>Too many matches. Please specify another filter.</div>
}

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

  console.log(countries)

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
