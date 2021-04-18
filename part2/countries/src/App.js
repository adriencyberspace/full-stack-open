import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Display(props) {

  if (props.filteredNames.length > 10) {
    return <Error />
  } 

  if (props.filteredNames.length === 1) {
    const countryNames = props.countries.map(country => country.name)
    const i = countryNames.indexOf(`${props.filteredNames}`)
    const current = props.countries[i]
    console.log(current)

    return (
      <div>
        <h2>{current.name}</h2>
        <div>Capital: {current.capital}</div>
        <div>Population: {current.population}</div>
        <h4>Languages:</h4>
        <ul>
          {current.languages.map(language =>
            <li key={language.name}>{language.name}</li>
            )}
        </ul>
        <img style={{ maxWidth: 250 }} src={current.flag} alt={`${current.name} flag`}></img>
      </div>
    )
  }

    return (
    <div>
      <ul>
        {props.filteredNames.map(name => 
          <li key={name}>{name}</li>
        )}
      </ul> 
    </div>
    )
}

function Error() {
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
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  
  const names = countries.map(country => country.name)
  const filteredNames= names.filter(name => name.toLowerCase().includes(`${search}`.toLowerCase()))



    

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
      <Display key={filteredNames} countries={countries} filteredNames={filteredNames} />
      
    </div>
  )
}

export default App;
