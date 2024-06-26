const express = require('express')
const router = express.Router()
const passport = require('passport');
const Character = require("../models/character");

router.get("/api/character/", (req, res) => {
    if (req.isAuthenticated()) {
        Character.find({})
            .then((result) => res.json(result))
            .catch((err) => res.json({ success: false, message: "Could not load characters: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

router.get("/api/character/count", (req, res) => {
    Character.estimatedDocumentCount()
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load counts: " + err }));
});

router.get("/api/character/:name", (req, res) => {
    if (req.isAuthenticated()) {
        Character.find({name: req.params.name})
            .then((result) => res.json(result[0]))
            .catch((err) => res.json({ success: false, message: "Could not load character. Error: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

router.post("/api/character/", (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated")
        return
    }
    const newChar = new Character(req.body.character)
    newChar.save()
        .then((result) => res.json(result))
        .catch((err) => {
            if (err.code === 11000) {
                res.status(500).send("A character with that name already exists")
            } else {
                res.status(500).send(err.message)
            }
        });
});

router.put("/api/character/", (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated")
        return
    }

    const newChar = new Character(req.body.character)
    Character.findOneAndUpdate({ name: newChar.name }, newChar, { new: true })
        .then((result) => res.json(result))
        .catch((err) => next(err));
});


module.exports = router