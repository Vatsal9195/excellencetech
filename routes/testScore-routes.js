const express = require('express');

const router = express.Router();

const TestScoreController = require('../controllers/testScore-controller');

router.post('/addScore', TestScoreController.addScore);

module.exports = router;