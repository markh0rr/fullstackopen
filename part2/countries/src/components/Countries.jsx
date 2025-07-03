import Country from './Country'

function CountryLink({country, filter, show}) {
    let countryName = country.name.common

    let before = countryName
    let match = ""
    let after = ""

    if(filter !== "") {
        const matchStart = countryName.toLowerCase().indexOf(filter.toLowerCase())
        before = countryName.slice(0, matchStart)
        match = countryName.slice(matchStart, matchStart+filter.length)
        after = countryName.slice(matchStart+filter.length, countryName.length)
    }

    return (
        <div>
            {before}<strong>{match}</strong>{after} <button onClick={show}>show</button>
        </div>
    )
}

function Countries({selected, countries, filter, show}) {
  if(selected !== null || (countries !== null && countries.length === 1)) {
    return <Country country={selected || countries[0]} />
  }
  
  if(countries === null) {
    return <></>
  }

  if(countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  
  if(countries.length > 1) {
    return (
      <>
        {countries.map(country => 
            <CountryLink 
                key={country.cca3} 
                country={country} 
                filter={filter}
                show={() => show(country)} />)}
      </>
    )
  }

  if(countries.length === 0) {
    return <p>No match</p>
  }
}

export default Countries