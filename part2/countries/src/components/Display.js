import React from 'react'
import Error from './Error'
import CountryInfo from './CountryInfo'

const Display = ({ countries }) => {

  if (countries.length > 10) {
    return <Error />
  } 

  if (countries.length === 1) {
    return (
      <div>
        {countries.map(country => (
          <CountryInfo key={country.name} country={country} />
        ))}
      </div>
    )
  }
    // If countries.length is between 1 and 10
    return (
    <div>
      <ul>
        {countries.map(country => 
          <li key={country.name}>{country.name}</li>
        )}
      </ul> 
    </div>
    )
}

export default Display