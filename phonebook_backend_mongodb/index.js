const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('requestContent', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestContent'))

const uri = process.env.DB_URI

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true
    },
    number: {
        type: String,
        minLength: 9,
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const phonebook = mongoose.model('phonebookcollections', personSchema)

mongoose.connect(uri)
    .then((result) => {
        console.log('connected to DB')
    })
    .catch((error) => console.log(error))

app.get('/info', (request, response) => {
    const id = phonebook.countDocuments({}).then(result => {
        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()
        response.send(`Phonebook has info for ${result} people at ${date} ${time}`)
    })
})

app.get('/api/persons', (request, response) => {
    phonebook.find({}).then(results => response.json(results))
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebook.findById(id).then(result => response.json(result))
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebook.findByIdAndDelete(id).then(result => response.json(result))
})

app.post('/api/persons', (request, response) => {
    const newPerson = new phonebook({
        name: request.body.name,
        number: request.body.number
    })
    newPerson.save()
        .then(result => response.json(result))
        .catch(error => {
            console.log(error)
            response.status(400).json({ errorMessage: 'name or number is too short' })
        })

})

app.put('/api/persons/:id', (request, response) => {
    phonebook.findByIdAndUpdate(request.params.id, {
        name: request.body.name,
        number: request.body.number
    }, { new: true }).then(result => response.json(result))
        .catch(error => response.json({ errorMessage: error }))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
}

const unknowEndpoint = (request, response) => {
    response.status(404).json({ error: 'unknown end point' })
}

app.use(unknowEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running at http//localhost:${PORT}`)
})



