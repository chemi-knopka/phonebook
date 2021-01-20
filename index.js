require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Contact = require('./models/contacts')


app.use(express.static('build'))
app.use(cors())
app.use(express.json());

// set up morgan for login outputs
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// -- routes ---
app.get('/api/persons', (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
});

app.get('/info', async (req, res, next) => {
    Contact.find({}).then(allContacts => {
        const personInfo = `<p>there are ${allContacts.length} persons in the phonephone</p>
        <p> ${new Date} </p>`
            
        res.send(personInfo)
    })
    
    
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
app.post('/api/persons', (req, res, next) => {
    const body = req.body
    
    // check if both name and phone number are provided
    if (!body.name || !body.number){
        res.status(400).json({
            error: "name or number is not provided"
        })
    }
    
    // create new contact to add in db
    const contact = new Contact({
        name: body.name,
        number: body.number,
    })

    // save contact in db
    contact
        .save()
        .then(returnedContact => res.json(returnedContact))
        .catch(error => next(error))
});

// update person
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;
    
    // this is for validation check
    // it must be enabled manualy while update
    const opts = { runValidators: true,  new: true  };
    Contact
        .findByIdAndUpdate(request.params.id, {number: body.number}, opts)
        .then(updatedCont => {
        response.json(updatedCont.toJSON())
        })
        .catch(error => next(error))
})

// this middleware must be in the end of the code to work correctly
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // catch CastError, it happens when provied bad id
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === "ValidationError"){
      return response.status(400).send({ error: error.message})
  }

  next(error)
}

// use error handle middle ware in routes
app.use(errorHandler)


// listen to the port
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`server is listening on port ${PORT}`);