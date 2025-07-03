import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [filter, setNewFilter] = useState('')

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