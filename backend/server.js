const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.port || 8000
const url = 'mongodb+srv://admin:test1234@cluster0.bqiaplq.mongodb.net/?retryWrites=true&w=majority'
const cors = require('cors')
// const bodyParser = require("body-parser");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Hello World!'))

async function connect() {
    try {
        mongoose.connect(url)
            .then(() => console.log('MongoDB Connected'))
            .catch(err => console.log(err));
    } catch (error) {
        console.error(error)
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    connect()
})

const dataSchema = new mongoose.Schema({
    firstname: String,
    lastname: String
});

//create a model
const Data = mongoose.model("Data", dataSchema);
Data.watch().on('change', data => console.log(new Date(), data));

async function getData() {
    const kittens = await Data.find();
    console.log(kittens);
}
getData();

//create an API route
app.post("/api/data", (req, res) => {
    const { firstname, lastname } = req.body;
    const newData = new Data({ firstname, lastname });
    newData.save()
        .then(() => res.status(200).json("Data saved to database"))
        .catch(err => res.status(400).json("Error: " + err));
});