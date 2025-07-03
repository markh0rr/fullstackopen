import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if(newName !== "") {
      const newPerson = {
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <p>debug: {newName}</p>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default App