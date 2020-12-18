const express = require("express");
const app = express();

const persons = [
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
})

const PORT = 3001
app.listen(PORT)
console.log(`server is listening on port ${PORT}`);