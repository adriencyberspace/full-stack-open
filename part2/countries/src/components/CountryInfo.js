import React from 'react'

const CountryInfo = ({ country }) => {
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
    </div>
  )
}

export default CountryInfo