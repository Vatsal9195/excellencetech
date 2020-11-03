const HttpError = require('../models/http-error');

const TestScore = require('../models/testScore');
const Candidate = require('../models/candidate');
// const { validationResult } = require('express-validator');

//post request for assigning score

const addScore = async (req, res, next) => {

    // const error = validationResult(req);
    // if (!error.isEmpty()) {
    //     return next(new HttpError('Invalid input, Please enter valid input', 422));
    // }

    const { firstRound, secondRound, thirdRound, candidate } = req.body;

    // let existingCandidate;
    // try {
    //     existingCandidate = await Candidate.findOne({ candidate: candidate });
    // } catch (err) {
    //     return next(new HttpError('Could not find the candidate', 500));
    // }

    // if (!existingCandidate) {
    //     return next(new HttpError('Candidate does not exist', 422));
    // }
    console.log();
    const testScore = new TestScore({
        firstRound,
        secondRound,
        thirdRound,
        totalScore: parseInt(firstRound) + parseInt(secondRound) + parseInt(thirdRound),
        candidate
    });

    let existingCandidate;
    try{
        existingCandidate = Candidate.findById(candidate);
    }catch(err){
        return next(new HttpError('Assigning of test score failed', 500));
    }
    if(!existingCandidate){
        return next(new HttpError('Could not find Candidate', 404));
    }

    try {
        await testScore.save();
    } catch (err) {
        return next(new HttpError('Failed, please try again later', 500));
    }

    res.status(201).json({ message: 'Test Score Assigned Successfully' });

}


exports.addScore = addScore;