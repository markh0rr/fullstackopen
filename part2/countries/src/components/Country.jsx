import {useEffect, useState} from 'react'
import meteo from '../services/meteo'

function Meteo({city, currentMeteo}) {
  if(currentMeteo === null) {
    return null
  }

  return (
    <>
      <h2>Weather in {city}</h2>
      <p>Temperature {currentMeteo.main.temp} Celsius </p>
      <img alt={`${currentMeteo.weather[0].description}`} src={`http://openweathermap.org/img/wn/${currentMeteo.weather[0].icon}@2x.png`} />
      <p>Wind {currentMeteo.wind.speed} m/s</p>
    </>
  )
}

function Country({country}) {
  const [currentMeteo, setCurrentMeteo] = useState(null)

  useEffect(() => {
    console.log("fetching the meteo")
    meteo
      .getCityMeteo(country.capital[0])
      .then(data => setCurrentMeteo(data))
      .catch(() => alert("failed to fetch meteo"))
  }, [country])

  const languages = []
  for(let langKey in country.languages) {
    languages.push(country.languages[langKey])
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital.map(capital => <span key={capital}>{capital} </span>)}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
      <Meteo 
        city={country.capital[0]}
        currentMeteo={currentMeteo} />
    </>
  )
}

export default Country