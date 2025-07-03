import { useState } from 'react'

const Person = ({person, filter}) => {
  if(filter !== "") {
    const startPosition = person.name.toLowerCase().indexOf(filter.toLowerCase())
    const before = person.name.slice(0, startPosition)
    const match = person.name.slice(startPosition, startPosition + filter.length)
    const after = person.name.slice(startPosition + filter.length, person.name.lenght)

    return <p>{before}<strong>{match}</strong>{after} {person.number}</p>

  } else {
    return (
      <p>{person.name} {person.number}</p>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberInputChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    if(newName !== "" && newPhoneNumber !== "") {
      if(persons.filter(person => person.name === newName).length > 0) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const newPerson = {
          name: newName,
          number: newPhoneNumber,
          id: String(persons.length+1)
        }
        setPersons(persons.concat(newPerson))
        setNewName("")
        setNewPhoneNumber("")
      }
    }
  }

  const filteredPerson = (filter !== "")
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterInputChange}></input>
      </div>
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
      {filteredPerson.map(person => 
        <Person key={person.id} person={person} filter={filter} />
      )}
    </div>
  )
}

export default App