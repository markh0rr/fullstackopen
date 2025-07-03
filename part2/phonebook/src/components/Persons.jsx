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

const Persons = ({persons, filter}) => {
    return (
        <>
          {persons.map(person => 
            <Person key={person.id} person={person} filter={filter} />
          )}
        </>
    )
}

export default Persons