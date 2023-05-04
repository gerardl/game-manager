const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const port = process.env.port || 8000
const url = process.env.MONGO_URI
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require("body-parser");

// setup cors to allow us to accept requests from our client
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))

// add json parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// auth setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// import controllers
const accountController = require('./controllers/account');
app.use(accountController)
const characterController = require('./controllers/character');
app.use(characterController)
const npcController = require('./controllers/npc');
app.use(npcController)

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