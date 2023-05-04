const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NPC = new Schema({
    name: { type: String, unique: true, index: true, required: true },
    isFriendly: { type: Boolean, required: true },
    level: { type: Number, required: true },
    experienceGiven: { type: Number, required: true },
    strength: { type: Number, required: true },
    dexterity: { type: Number, required: true },
    constitution: { type: Number, required: true },
    intelligence: { type: Number, required: true}
    // todo: loot
});

module.exports = mongoose.model('NPC', NPC);