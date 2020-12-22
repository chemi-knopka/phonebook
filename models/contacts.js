const mongoose = require('mongoose');

const url = process.env.DB_URI
console.log("connecting to :", url);

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

contactSchema.set('toJSON', {
    transform: (document, contactObj) => {
        contactObj.id = contactObj._id
        delete contactObj._id
        delete contactObj.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema);