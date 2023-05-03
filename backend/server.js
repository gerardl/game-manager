const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const port = process.env.port || 8000
const url = 'mongodb+srv://admin:test1234@cluster0.bqiaplq.mongodb.net/?retryWrites=true&w=majority'
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require("body-parser");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// use static serialize and deserialize of model for passport session support
app.use(passport.initialize());
app.use(passport.session());

// auth setup
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

User.watch().on('change', data => console.log(new Date(), data));

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

// async function getData() {
//     const kittens = await Data.find();
//     console.log(kittens);
// }
// getData();

//create an API route
app.post("/api/data", (req, res) => {
    const { firstname, lastname } = req.body;
    const newData = new Data({ firstname, lastname });
    newData.save()
        .then(() => res.status(200).json("Data saved to database"))
        .catch(err => res.status(400).json("Error: " + err));
});

app.post("/api/register", (req, res) => {
    // const { username, password } = req.body;
    // const newData = new um({ username, password });
    // newData.save()
    //     .then(() => res.status(200).json("Data saved to database"))
    //     .catch(err => res.status(400).json("Error: " + err));
    User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        }
        else {
            req.login(user, (er) => {
                if (er) {
                    res.json({ success: false, message: er });
                }
                else {
                    res.json({ success: true, message: "Your account has been saved" });
                }
            });
        }
    });
});

app.post("/api/login", (req, res) => {
    if (!req.body.username) {
        res.json({ success: false, message: "Username was not given" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Password was not given" })
    }
    else {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!user) {
                    res.json({ success: false, message: "username or password incorrect" });
                }
                else {
                    req.login(user, (er) => {
                        if (er) {
                            res.json({ success: false, message: er });
                        }
                        else {
                            res.json({ success: true, message: "You are logged in" });
                        }
                    });
                }
            }
        })(req, res);
    }
});

app.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ success: true, message: "User is authenticated", user: req.user });
    } else {
        res.json({ success: false, message: "User is not authenticated" });
    }
});

app.post("/api/logout", (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    // req.logout();
    res.json({ success: true, message: "logout successful" });
});