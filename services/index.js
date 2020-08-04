const { getStudentInformation, getCourseInformation, getSubmittedAssignmentById, getAssignmentId } = require('../repositorys');

const getProfileByStudent = student => getStudentInformation(student);

const getProfileByCourse = async course => {
    const courseInformation = await getCourseInformation(course);
    courseInformation.assignments = await Promise.all(courseInformation.assignments
        .map(assignment => getAssignmentId(assignment).then(({ _id, title }) => ({ id: _id, title }))));
    return courseInformation;
};

const getAssignmentByStudent = async (student, assignment) => {
    const studentProfile = await getProfileByStudent(student);
    const completedAssignment = studentProfile.assignments.find(assignmentInfo => assignmentInfo.assignment === assignment);
    if (completedAssignment) {
        const assignment = await getSubmittedAssignmentById(completedAssignment.submitted_assignment);
        return {
            id: completedAssignment.assignment,
            assignment: assignment.assignment,
            score: assignment.question.reduce((acc, { score }) => acc + score, 0),
            total: assignment.question.reduce((acc, { fullScore }) => acc + fullScore, 0)
        }
    }

    return null;
};

const getAssignmentReview = async (student, assignment) => {
    const studentProfile = await getProfileByStudent(student);
    const completedAssignment = studentProfile.assignments.find(assignmentInfo => assignmentInfo.assignment === assignment);
    if(completedAssignment) {
        const submission = await getSubmittedAssignmentById(completedAssignment.submitted_assignment);
        const assignment = await getAssignmentId(completedAssignment.assignment);
        return assignment.questions.map(({ question, answer}, i) => ({
            question,
            answer,
            response: submission.question[i].answer,
            correct: submission.question[i].correct,
            partial: submission.question[i].partial,
        }))
    }
    return null;
};

module.exports = {
    getProfileByStudent,
    getProfileByCourse,
    getAssignmentByStudent,
    getAssignmentReview,
};