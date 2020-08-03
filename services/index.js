const { getStudentInformation, getCourseInformation, getSubmittedAssignmentById, getAssignmentId } = require('../repositorys');

const getProfileByStudent = student => getStudentInformation(student);

const getProfileByCourse = course => getCourseInformation(course);

const getAssignmentByStudent = async (student, assignment) => {
    const studentProfile = await getProfileByStudent(student);
    const completedAssignment = studentProfile.assignments.find(assignmentInfo => assignmentInfo.assignment === assignment);
    if (completedAssignment) {
        const assignment = await getSubmittedAssignmentById(completedAssignment.submitted_assignment);
        return {
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
        console.log(`${submission}  ${assignment}` )
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