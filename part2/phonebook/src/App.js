import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [ search, setSearch ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (names.indexOf(newName) > -1) {
      alert(`${newName} is already in phonebook`)
    } else {
      const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setShowAll(false)
  }

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(`${search}`.toLowerCase()))

  return (
    <div>
    <h2>Filter</h2>
      <form>
        <div>
          Filter shown with: 
          <input 
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
          Name: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
