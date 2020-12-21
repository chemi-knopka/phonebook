require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Contact = require('./models/contacts')

// id generator for documents
const generateId = () => {
    let id = Math.floor(Math.random()*1000000)
    return id
}


let persons = [
    {
        id: 1,
        name: "artos",
        number: "1111"
    },
    {
        id: 2,
        name: 'batos',
        number: '22-2'
    },
    {
        id: 3,
        name: 'partos',
        number: '33-3-3'
    }
]

app.use(express.static('build'))
app.use(cors())
app.use(express.json());
// set up morgan for logins
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// -- routes ---
app.get('/api/persons', (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
});

app.get('/info', (req, res) => {
    const personInfo = 
    `<p>there are ${persons.length} persons in the phonephone</p>
    <p> ${new Date} </p>`
    
    res.send(personInfo)
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id);

    if (!person){
        res.status(404).end()
    }

    res.json(person)
});

// delete person
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (!person){
        res.status(404).end()
    }

    persons = persons.filter(person => person.id !== id);
    res.send(`deleted person with id : ${id}`)
});

//post new person
app.post('/api/persons', (req, res) => {
    const body = req.body
    
    // check if both name and phone number are provided
    if (!body.name || !body.number){
        res.status(400).json({
            error: "name or number is not provided"
        })
    }
    
    const contact = new Contact({
        name: body.name,
        number: body.number,
    })

    contact.save().then(returnedContact => {
        res.json(returnedContact)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`server is listening on port ${PORT}`);