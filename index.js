require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Contact = require('./models/contacts')


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

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id)
        .then(contact => {
            if (contact){
                res.json(contact)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            //res.status(400).send({error: "malformed id"})
            next(error)
        })
});

// delete person
app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

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

// this middleware must be in the end of the code to work correctly
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// use error handle middle ware in routes
app.use(errorHandler)


// listen to the port
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`server is listening on port ${PORT}`);