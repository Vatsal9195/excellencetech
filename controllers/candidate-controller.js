const HttpError = require('../models/http-error');

const Candidate = require('../models/candidate');
const { validationResult } = require('express-validator');

//post request for creating candidate

const addCandidate = async (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new HttpError('Invalid input, Please enter valid input', 422));
    }

    const { name, email } = req.body;

    let existingCandidate;
    try {
        existingCandidate = await Candidate.findOne({ email: email });
    } catch (err) {
        return next(new HttpError('Could not create new Candidate', 500));
    }

    if (existingCandidate) {
        return next(new HttpError('Candidate exist', 422));
    }

    const createdCandidate = new Candidate({
        name,
        email
    });

    try {
        await createdCandidate.save();
    } catch (err) {
        return next(new HttpError('Failed, please try again later', 500));
    }

    res.status(201).json({ message: 'Candidate Created Successfully' });

}


exports.addCandidate = addCandidate;