import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebook from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    phonebook
      .getAllEntries()
      .then(entries => setPersons(entries))
  }, [])

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
  }

  const registerNewPerson = (name, number, onSuccessCallback) => {
    const match = persons.filter(person => person.name === name)
    if(match.length > 0) {
      const confirmation = window.confirm(`${name} is already added to phonebook, replace the old number with a new one ?`)
      if(confirmation) {
        phonebook
          .updateEntry(match[0].id, number)
          .then(updatedEntry => {
            setPersons(persons.map(person => (person.id !== updatedEntry.id)? person : updatedEntry))
            onSuccessCallback()
          })
      }
    } else {
      const newPerson = {
        name,
        number
      }
      phonebook
        .registerNewEntry(newPerson)
        .then(newEntry => {
          setPersons(persons.concat(newEntry))
          onSuccessCallback()
        })
    }
  }

  const deleteEntry = (entry) => {
    const confirmation = window.confirm(`Delete ${entry.name} ?`)
    if(confirmation) {
      phonebook
        .deleteEntry(entry.id)
        .then(deletedEntry => {
          setPersons(persons.filter(person => person.id !== deletedEntry.id))
        })
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
      <Persons persons={filteredPerson} filter={filter} handleDelete={deleteEntry} />
    </div>
  )
}

export default App