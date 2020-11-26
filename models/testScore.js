const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Test Score Model
const testScoreSchema = new Schema({
    firstRound: { type: Number, required: true },
    secondRound: { type: Number, required: true },
    thirdRound: { type: Number, required: true },
    totalScore: { type: Number, required: true },
    candidate: { type: mongoose.Types.ObjectId, required: true, ref: 'Candidate' }
});

module.exports = mongoose.model('TestScore', testScoreSchema);