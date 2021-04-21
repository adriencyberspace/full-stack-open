import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import noteService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(false)
  const [ search, setSearch ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ notifColor, setNotifColor ] = useState('black')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (names.indexOf(newName) > -1) {

      if (window.confirm(`${newName} is already in phonebook. Would you like to update their phone number?`)) {
        const thisPerson = persons.find(person => person.name === newName)
        const changedPerson = {...thisPerson, number: newNumber}

        noteService
          .update(changedPerson.id, changedPerson).then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          })
      }
    } else {
      const personObject = {
      name: newName,
      number: newNumber
      }

      noteService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })

      setNotifColor('green')
      setNotification(
        `${newName}' has been added to phonebook.`
      )
      setTimeout(() => {
        setNotification(null)
      }, 2000)
      
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

  const deleteThisPerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      axios.delete(`http://localhost:3001/persons/${id}`).then(() => 
        setPersons(persons.filter(p => p.id !== id))
      ).catch(error => {
        setNotifColor('red')
        setNotification(
          `${person.name} already deleted from phonebook.`
        )
        setTimeout(() => {
          setNotification(null)
        }, 2000)
        setPersons(persons.filter(p => p.id !== id))
      })
      
    }
    
  }

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(`${search}`.toLowerCase()))

  return (
    <div>

    <h2>Phonebook</h2>
    <Notification message={notification} notifColor={notifColor} />

    <Filter search={search} handleSearchChange={handleSearchChange}/>

    <h2>Add New Entry</h2>
    
    <PersonForm 
      addPerson={addPerson} 
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      
      <ul>
        {personsToShow.map(person => 
          <Person 
            key={person.name} 
            person={person}
            deletePerson = {() => deleteThisPerson(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App
