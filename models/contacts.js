const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); 

const url = process.env.DB_URI
console.log("connecting to database....");

// database connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(res => {
        console.log("connected to MongoDB");
    })
    .catch(error => {
        console.log("failed to connect to db", error.message)
    })

// define schema for models
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    number:String,
})

contactSchema.set('toJSON', {
    transform: (document, contactObj) => {
        contactObj.id = contactObj._id
        delete contactObj._id
        delete contactObj.__v
    }
})

// Apply the uniqueValidator plugin to userSchema.
contactSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Contact', contactSchema);