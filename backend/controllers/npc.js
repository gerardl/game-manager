const express = require('express')
const router = express.Router()
const passport = require('passport');
const NPC = require("../models/npc");

router.get("/api/npc/", (req, res) => {
    if (req.isAuthenticated()) {
        NPC.find({})
            .then((result) => res.json(result))
            .catch((err) => res.json({ success: false, message: "Could not load npcs: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

router.get("/api/npc/count", (req, res) => {
    NPC.estimatedDocumentCount()
        .then((result) => res.json(result))
        .catch((err) => res.json({ success: false, message: "Could not load counts: " + err }));
});

router.get("/api/npc/:name", (req, res) => {
    if (req.isAuthenticated()) {
        NPC.find({name: req.params.name})
            .then((result) => res.json(result[0]))
            .catch((err) => res.json({ success: false, message: "Could not load NPC. Error: " + err }));
    } else {
        res.status(401).send("User is not authenticated")
    }
});

router.post("/api/npc/", (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated")
        return
    }
    const newNPC = new NPC(req.body.npc)
    newNPC.save()
        .then((result) => res.json(result))
        .catch((err) => {
            if (err.code === 11000) {
                res.status(500).send("An npc with that name already exists")
            } else {
                res.status(500).send(err.message)
            }
        });
});

router.put("/api/npc/", (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("User is not authenticated")
        return
    }

    const newNPC = new NPC(req.body.npc)
    NPC.findOneAndUpdate({ name: newNPC.name }, newNPC, { new: true })
        .then((result) => res.json(result))
        .catch((err) => next(err));
});


module.exports = router