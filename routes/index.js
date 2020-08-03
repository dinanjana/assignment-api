const { getProfileByStudent, getProfileByCourse, getAssignmentByStudent, getAssignmentReview } = require('../services');

const getStudentProfile = (req, res) => getProfileByStudent(req.params.student)
    .then(info => {
        if (info) {
            res.send(info);
            return;
        }
        res.status(404).send("Couldn't find the information");
    }).catch(err => res.status(500).send('Unexpected error occurred'));

const getCourseProfile = (req, res) => getProfileByCourse(req.params.course)
    .then(info => {
        if (info) {
            res.send(info);
            return;
        }
        res.status(404).send("Couldn't find the information");
    }).catch(err => res.status(500).send('Unexpected error occurred'));

const getCompletedAssignment = (req, res) => getAssignmentByStudent(req.params.student, req.params.assignment)
    .then(info => {
        if (info) {
            res.send(info);
            return;
        }
        res.status(404).send("Couldn't find the information");
    }).catch(err => res.status(500).send('Unexpected error occurred'));

const getReviewOfAssignment = (req, res) => getAssignmentReview(req.params.student, req.params.assignment)
    .then(info => {
        if (info) {
            res.send(info);
            return;
        }
        res.status(404).send("Couldn't find the information");
    }).catch(err => res.status(500).send(err));

module.exports = {
    getStudentProfile,
    getCourseProfile,
    getCompletedAssignment,
    getReviewOfAssignment
};