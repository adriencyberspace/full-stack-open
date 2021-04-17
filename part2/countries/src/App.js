import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Display(props) {
  if (props.countriesToShow.length > 10) {
    return <Error />
  } 
  
    return (
    <div>
      <ul>
          {props.countriesToShow.map(name => 
            <li>{name}</li>
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
  const [ showAll, setShowAll ] = useState(false)
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

  const names = countries.map(country => country.name)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setShowAll(false)
  }
  
  const countriesToShow = showAll
  ? names
  : names.filter(name => name.toLowerCase().includes(`${search}`.toLowerCase()))

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
      <Display countriesToShow={countriesToShow} />
      
    </div>
  )
}

export default App;
