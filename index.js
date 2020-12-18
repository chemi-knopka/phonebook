const express = require("express");
const app = express();

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

app.use(express.json())

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

const generateId = () => {
    let id = Math.floor(Math.random()*1000000)
    return id
}

//post new person
app.post('/api/persons', (req, res) => {
    const body = req.body
    
    // check if both name and phone number are provided
    if (!body.name || !body.number){
        res.status(400).json({
            error: "name or number is not provided"
        })
    }
    
    const isPersonDuplicated = persons.find(person => person.name === body.name);
    if (isPersonDuplicated){
        res.status(400).json({
            error: "person's name is already in the db"
        })
    }


    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`server is listening on port ${PORT}`);