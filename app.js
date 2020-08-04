const express = require('express');
const cors = require('cors');
const { run } = require('./repositorys');
const { getStudentProfile, getCourseProfile, getCompletedAssignment, getReviewOfAssignment } = require('./routes');
const { logger } = require('./configs/log');
const { SERVER_PORT } = require('./configs/Constants');

const app = express();

app.use(cors());

app.get('/student/:student', getStudentProfile);

app.get('/course/:course', getCourseProfile);

app.get('/assignments/:assignment/students/:student', getCompletedAssignment);

app.get('/assignments/:assignment/students/:student/review', getReviewOfAssignment);

app.listen(SERVER_PORT, () => {
    logger.info(`assignment-api listening at http://localhost:${SERVER_PORT}`)
});

run();