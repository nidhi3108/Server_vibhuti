const mongoose = require('mongoose');
const Course = require('./models/coursemodel');
const Speaker = require('./models/speakermodel');
const CourseSpeaker = require('./models/coursespeakermodel');
const Topic = require('./models/topicmodel');

mongoose.connect('mongodb+srv://nidhi3108:123Nid45@cluster0.u5hhcyg.mongodb.net/vibhutitask?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const seedDatabase = async () => {
    await Course.deleteMany({});
    await Speaker.deleteMany({});
    await CourseSpeaker.deleteMany({});
    await Topic.deleteMany({});

    const topics = await Topic.insertMany([
        { name: 'Programming' },
        { name: 'Python' },
        { name: 'Data Structures' },
        { name: 'Machine Learning' },
        { name: 'Web Development' }
    ]);

    const speakers = await Speaker.insertMany([
        { name: 'Speaker 1' },
        { name: 'Speaker 2' },
        { name: 'Speaker 3' },
        { name: 'Speaker 4' },
        { name: 'Speaker 5' }
    ]);

    function getDateDaysAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    }

    const courses = await Course.insertMany([
        {
            name: 'Introduction to Programming',
            topicId: topics[0]._id,
            priceRange: { min: 50, max: 100 },
            createdOn: getDateDaysAgo(3)
        },
        {
            name: 'Advanced Programming Techniques',
            topicId: topics[0]._id,
            priceRange: { min: 200, max: 300 },
            createdOn: getDateDaysAgo(2)
        },
        {
            name: 'Python for Beginners',
            topicId: topics[1]._id,
            priceRange: { min: 80, max: 150 },
            createdOn: getDateDaysAgo(3)
        },
        {
            name: 'Python Data Analysis',
            topicId: topics[1]._id,
            priceRange: { min: 150, max: 250 },
            createdOn: getDateDaysAgo(2)
        },
        {
            name: 'Data Structures Fundamentals',
            topicId: topics[2]._id,
            priceRange: { min: 100, max: 200 },
            createdOn: getDateDaysAgo(3)
        },
        {
            name: 'Advanced Data Structures',
            topicId: topics[2]._id,
            priceRange: { min: 250, max: 350 },
            createdOn: getDateDaysAgo(2)
        },
        {
            name: 'Machine Learning Basics',
            topicId: topics[3]._id,
            priceRange: { min: 200, max: 400 },
            createdOn: getDateDaysAgo(3)
        },
        {
            name: 'Deep Learning with TensorFlow',
            topicId: topics[3]._id,
            priceRange: { min: 300, max: 500 },
            createdOn: getDateDaysAgo(2)
        },
        {
            name: 'Web Development with HTML & CSS',
            topicId: topics[4]._id,
            priceRange: { min: 100, max: 200 },
            createdOn: getDateDaysAgo(3)
        },
        {
            name: 'Full-Stack Web Development',
            topicId: topics[4]._id,
            priceRange: { min: 400, max: 600 },
            createdOn: getDateDaysAgo(2)
        },
        {
            name: 'Course 1',
            topicId: topics[0]._id,
            priceRange: { min: 100, max: 200 },
            createdOn: getDateDaysAgo(3)
        },
        {
            name: 'Course 2',
            topicId: topics[1]._id,
            priceRange: { min: 150, max: 250 },
            createdOn: getDateDaysAgo(2)
        },
        {
            name: 'Course 3',
            topicId: topics[2]._id,
            priceRange: { min: 200, max: 300 },
            createdOn: getDateDaysAgo(3)
        },
        {
            name: 'Course 4',
            topicId: topics[3]._id,
            priceRange: { min: 250, max: 350 },
            createdOn: getDateDaysAgo(2)
        },
        {
            name: 'Course 5',
            topicId: topics[4]._id,
            priceRange: { min: 300, max: 400 },
            createdOn: getDateDaysAgo(3)
        },
    ]);


    await CourseSpeaker.insertMany([
        { courseId: courses[0]._id, speakerId: speakers[0]._id },
        { courseId: courses[1]._id, speakerId: speakers[1]._id },
        { courseId: courses[2]._id, speakerId: speakers[2]._id },
        { courseId: courses[3]._id, speakerId: speakers[3]._id },
        { courseId: courses[4]._id, speakerId: speakers[4]._id },
        { courseId: courses[5]._id, speakerId: speakers[0]._id },
        { courseId: courses[6]._id, speakerId: speakers[1]._id },
        { courseId: courses[7]._id, speakerId: speakers[2]._id },
        { courseId: courses[8]._id, speakerId: speakers[3]._id },
        { courseId: courses[9]._id, speakerId: speakers[4]._id },
        { courseId: courses[10]._id, speakerId: speakers[0]._id },
        { courseId: courses[11]._id, speakerId: speakers[1]._id },
        { courseId: courses[12]._id, speakerId: speakers[2]._id },
        { courseId: courses[13]._id, speakerId: speakers[3]._id },
        { courseId: courses[14]._id, speakerId: speakers[4]._id },
    ]);

    console.log('Database seeded!');
    mongoose.connection.close();
};

seedDatabase();
