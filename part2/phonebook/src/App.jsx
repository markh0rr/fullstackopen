import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
  }

  const registerNewPerson = (name, number, onSuccessCallback) => {
    if(persons.filter(person => person.name === name).length > 0) {
        alert(`${name} is already added to phonebook`)
    } else {
      const newPerson = {
        name,
        number,
        id: String(persons.length+1)
      }
      setPersons(persons.concat(newPerson))
      onSuccessCallback()
    }
  }

  const filteredPerson = (filter !== "")
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterInputChange}/>
      <h2>Add a new</h2>
      <PersonForm registerNewPerson={registerNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPerson} filter={filter} />
    </div>
  )
}

export default App