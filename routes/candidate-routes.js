const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const CandidateController = require('../controllers/candidate-controller');

router.post('/addCandidate',
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail()
    ], CandidateController.addCandidate);

module.exports = router;