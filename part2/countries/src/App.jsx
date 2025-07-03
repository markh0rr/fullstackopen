import { useState, useEffect} from 'react'
import Countries from './components/Countries'
import countriesService from './services/countries'

function App() {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState("")
  const [selected, setSelected] = useState(null)

  useEffect(() => {
      countriesService
        .getAll()
        .then(data => setCountries(data))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelected(null)
  }

  const show = (country) => {
    setSelected(country)
  }

  let filteredCountries = countries
  if(countries !== null) {
    filteredCountries = (filter !== "")
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries
  }

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <Countries 
        selected={selected} 
        countries={filteredCountries} 
        filter={filter}
        show={show} />
    </>
  )
}

export default App