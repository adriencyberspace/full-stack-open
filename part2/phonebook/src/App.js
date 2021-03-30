import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (names.indexOf(newName) > -1) {
      alert(`${newName} is already in phonebook`)
    } else {
      const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    }

  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: 
          <input 
            value={newName}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
