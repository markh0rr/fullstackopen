const Person = ({person, filter, handleDelete}) => {
  if(filter !== "") {
    const startPosition = person.name.toLowerCase().indexOf(filter.toLowerCase())
    const before = person.name.slice(0, startPosition)
    const match = person.name.slice(startPosition, startPosition + filter.length)
    const after = person.name.slice(startPosition + filter.length, person.name.lenght)

    return (
      <div>
        {before}<strong>{match}</strong>{after} {person.number} <button onClick={handleDelete}>delete</button>
      </div>
    )
  } else {
    return (
      <div>
        {person.name} {person.number} <button onClick={handleDelete}>delete</button>
      </div>
    )
  }
}

const Persons = ({persons, filter, handleDelete}) => {
    return (
        <>
          {persons.map(person => 
            <Person key={person.id} person={person} filter={filter} handleDelete={() => handleDelete(person)} />
          )}
        </>
    )
}

export default Persons