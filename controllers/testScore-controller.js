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

    let existingCandidate, existingScore;
    try {
        existingCandidate = await Candidate.findById(candidate);
        existingScore = await TestScore.findOne({ candidate: candidate });
    } catch (err) {
        return next(new HttpError('Assigning of test score failed', 500));
    }
    if (!existingCandidate) {
        return next(new HttpError('Could not find Candidate', 404));
    }
    if (existingScore) {
        return next(new HttpError('Candidate Test Score already exist', 422));
    }

    try {
        await testScore.save();
    } catch (err) {
        return next(new HttpError('Failed, please try again later', 500));
    }

    res.status(201).json({ message: 'Test Score Assigned Successfully' });

}

//Get highest Scoring candidate

const highestScoreCandidate = async (req, res, next) => {
    let scores, highestScoreId;
    try {
        scores = await TestScore.find();
        highestScoreId = scores.reduce((prev, current) => (prev.totalScore > current.totalScore) ? prev : current);
    }
    catch (err) {
        return next(new HttpError('something went wrong, try agian', 500));
    }

    let candidate;
    try {
        candidate = await Candidate.findById(highestScoreId.candidate);
    } catch (err) {
        return next(new HttpError('something went wrong, try agian', 500));
    }

    res.status(201).json({ highestScoringCandidate: { candidate: candidate, testScore: highestScoreId } });

}

//get average score for each round 

const avgScore = async (req, res, next) => {

    let scores, firstAvg = 0, secondAvg = 0, thirdAvg = 0;
    try {
        scores = await TestScore.find();
        scores.map((score) => {
            firstAvg = (firstAvg + score.firstRound),
                secondAvg = (secondAvg + score.secondRound),
                thirdAvg = (thirdAvg + score.thirdRound)
        });
    }
    catch (err) {
        return next(new HttpError('something went wrong, try agian', 500));
    }

    res.status(201).json({
        firstRoundAvg: firstAvg / scores.length,
        secondRoundAvg: secondAvg / scores.length,
        thirdRoundAvg: thirdAvg / scores.length
    });
}


exports.addScore = addScore;
exports.highestScoreCandidate = highestScoreCandidate;
exports.avgScore = avgScore;