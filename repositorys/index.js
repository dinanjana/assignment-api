const { MongoClient, ObjectID } = require('mongodb');
const { logger } = require('../configs/log');

const uri =
    "mongodb+srv://assignment-api:p@ssw0rd@cluster0.nxqjg.mongodb.net/assignment?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true,
    useNewUrlParser: true, });

async function run() {
    await client.connect();
}
run().catch(logger.error);

async function getStudentInformation(student) {
    try {
        const database = client.db('grades');
        const collection = database.collection('students');
        const query = { student };
        return collection.findOne(query);
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

async function getCourseInformation (course) {
    try {
        const database = client.db('grades');
        const collection = database.collection('courses');
        const query = { title: course, };
        return collection.findOne(query);
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

async function getSubmittedAssignmentById(id) {
    try {
        const database = client.db('grades');
        const collection = database.collection('submitted_assignments');
        return collection.findOne({ _id: ObjectID(id) });
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

async function getAssignmentId(id) {

    try {
        const database = client.db('grades');
        const collection = database.collection('assignments');
        return collection.findOne({ _id: ObjectID(id) });
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

module.exports = {
    run,
    getStudentInformation,
    getCourseInformation,
    getSubmittedAssignmentById,
    getAssignmentId
};