const express = require('express')
const app = express()

app.use(express.json())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
 response.json(persons)
})

app.get('/info', (request, response) => {
  const body = `<p>Phonebook has info for ${persons.length} people.</p><p>${new Date()}</p>`
  response.status(200).send(body)
})

app.get('/api/persons/:id', (request, response) => {
 const id = +request.params.id
 const person = persons.filter(person => person.id === id)

 if(person){
  response.json(person)
 }else{
  response.status(404).end()
 }
})

app.delete('/api/persons/:id', (request, response) => {
 const id = +request.params.id
 persons = persons.filter(person => person.id !== id)
 response.status(204).end()
})

app.post('/api/persons', (request, response) => {
 
 const body = request.body

 if(!body.name){
  return response.status(400).json({
   error: 'name required'
  })
 }if(!body.number){
  return response.status(400).json({
   error: 'number required'
  })
 } 
 function userExists(name) {
  return persons.some(function(el) {
    return el.name === name;
  }); 
 }
 if(userExists(body.name)){
  return response.status(400).json({
   error: "that person is already in the phonebook"
  });
 }

 const person = {
  
  id: Math.floor(Math.random() * 10000),
  name: body.name,
  number: body.number
 }
 persons = persons.concat(person)
 response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`phonebook server running on port ${PORT}`)
