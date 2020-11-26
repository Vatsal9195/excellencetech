const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
// candidate model
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

candidateSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Candidate', candidateSchema);