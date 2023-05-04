const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Character = new Schema({
    name: { type: String, unique: true, index: true, required: true },
    class: { type: String, required: true },
    level: { type: Number, required: true },
    experience: { type: Number, required: true },
    strength: { type: Number, required: true },
    dexterity: { type: Number, required: true },
    constitution: { type: Number, required: true },
    intelligence: { type: Number, required: true},
    gold: { type: Number, required: true}
});

module.exports = mongoose.model('Character', Character);