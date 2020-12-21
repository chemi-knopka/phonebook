require('dotenv').config();
const mongoose = require('mongoose');
const args = process.argv


if (!(args.length === 2 || args.length === 4)){
    console.log(
        `please run the application with following engty
        node mongo.js <password> <name> <phone>`);
    process.exit(1)
} 

const url = process.env.DB_URI
console.log("connecting to ", url)
// database connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(res => {
        console.log("connected to db");
    })
    .catch(error => {
        console.log("failed to connect to db", error.message)
    })

// define schema for models
const contactSchema = mongoose.Schema({
    name: String,
    number:String,
})

// create model
const Contact = mongoose.model('Contact', contactSchema);

// now if there are 3 arguments retriece all entries
if (args.length === 2){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close()
    })
}
// if there are 5 arguments create new entry
if (args.length === 4){
    const person = new Contact({
        name: args[2],
        number: args[3],
    })
    // save person to the database
    person.save().then(result => {
        console.log("person is saved");
        mongoose.connection.close()
    })
}
