const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const candidateRoutes = require('./routes/candidate-routes');
const testScoreRoutes = require('./routes/testScore-routes');
const httpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/testScore', testScoreRoutes);

app.use('/api/candidate', candidateRoutes);

app.use((req, res, next) => {

    const error = new httpError('Could not find the path', 404);
    throw error;

});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({ message: error.message || 'An Unknown error Occured!' })
});

mongoose.connect(
    "mongodb+srv://Vatsal:1234qwerty@clustermern.kocaf.mongodb.net/excTech?retryWrites=true&w=majority"
).then(() => {
    app.listen(5000);
}).catch(err => {
    console.log(err);
});