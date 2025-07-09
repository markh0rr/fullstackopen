const express = require("express")
const morgan = require("morgan")
app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

morgan.token("content", (req, resp) => {
  if(req.method === "POST") {
    return JSON.stringify(req.body)
  } else {
    return ""
  }
})
const MORGAN_MIDDLEWARE = morgan(':method :url :status :res[content-length] - :response-time ms :content')
app.use(MORGAN_MIDDLEWARE)

app.get('/api/persons/', (req, resp) => {
    resp.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(note => note.id === id)
  persons = persons.filter(note => note.id !== id)
  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  if(!req.body || !req.body.name || !req.body.number) {
    return res.status(400).send({error: "name or number missing"})
  }

  const match = persons.find(person => person.name === req.body.name)
  if(match) {
    return res.status(403).json({error: "entry already exists"})
  }

  const person = {
    name: req.body.name,
    content: req.body.number,
    id: String(Math.ceil(Math.random()*3000))
  }

  persons = persons.concat(person)
  res.json(person)
})

app.get('/info', (req, resp) => {
  const personsResume = `Phonebook as info for ${persons.length} people`
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Bucharest",   // the Date() object is always in UTC, timezone changes the displayed time
  }
  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(new Date()) // returns an array of object with type and value
  const lookup = {}
  parts.forEach(part => {lookup[part.type] = part.value})
  const date = `${lookup.weekday} ${lookup.month} ${lookup.day} ${lookup.year} ${lookup.hour}:${lookup.minute}:${lookup.second} GMT+0200 (Eeastern European Standard Time)`
  return resp.send(`${personsResume}<br/>${date}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`app runs on port ${PORT}`)
})