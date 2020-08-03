const express = require('express');
const { run } = require('./repositorys');
const { getStudentProfile, getCourseProfile, getCompletedAssignment, getReviewOfAssignment } = require('./routes');
const { logger } = require('./configs/log');
const { PORT } = require('./configs/Constants');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/student/:student', getStudentProfile);

app.get('/course/:course', getCourseProfile);

app.get('/assignments/:assignment/students/:student', getCompletedAssignment);

app.get('/assignments/:assignment/students/:student/review', getReviewOfAssignment);

app.listen(PORT, () => {
    logger.info(`assignment-api listening at http://localhost:${PORT}`)
});

run();