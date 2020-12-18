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
})

const PORT = 3001
app.listen(PORT)
console.log(`server is listening on port ${PORT}`);