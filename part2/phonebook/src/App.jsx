import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.phone}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberInputChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    if(newName !== "" && newPhoneNumber !== "") {
      if(persons.filter(person => person.name === newName).length > 0) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const newPerson = {
          name: newName,
          phone: newPhoneNumber
        }
        setPersons(persons.concat(newPerson))
        setNewName("")
        setNewPhoneNumber("")
      }
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
          phone: <input value={newPhoneNumber} onChange={handlePhoneNumberInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default App