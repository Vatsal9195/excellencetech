const express = require('express');

const router = express.Router();

const TestScoreController = require('../controllers/testScore-controller');

router.post('/addScore', TestScoreController.addScore);

router.get('/hsCandidate', TestScoreController.highestScoreCandidate);

router.get('/avgScore', TestScoreController.avgScore);

module.exports = router;