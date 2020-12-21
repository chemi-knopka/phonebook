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

module.exports = mongoose.model('Contact', contactSchema);