import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notifications'
import {createErrorMessage, createSuccessMessage} from './services/messageBuilder'
import phonebook from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
 
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
        const id = match[0].id
        phonebook
          .updateEntry(id, number)
          .then(updatedEntry => {
            setPersons(persons.map(person => (person.id !== updatedEntry.id)? person : updatedEntry))
            setMessage(createSuccessMessage(`Updated ${updatedEntry.name}`))
            setTimeout(() => setMessage(null), 5000)
            onSuccessCallback()
          })
          .catch(() => {
            setMessage(createErrorMessage(`Information of ${name} has already been removed from the server`))
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.filter(person => person.id !== id))
          })
      }
    } else {
      phonebook
        .registerNewEntry({name, number})
        .then(newEntry => {
          setPersons(persons.concat(newEntry))
          setMessage(createSuccessMessage(`Added ${newEntry.name}`))
          setTimeout(() => setMessage(null), 5000)
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
          setMessage(createSuccessMessage(`Removed ${deletedEntry.name}`))
          setTimeout(() => setMessage(null), 5000)
        })
    } 
  }

  const filteredPerson = (filter !== "")
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={handleFilterInputChange}/>
      <h2>Add a new</h2>
      <PersonForm registerNewPerson={registerNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPerson} filter={filter} handleDelete={deleteEntry} />
    </div>
  )
}

export default App