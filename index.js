const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const Course = require('./models/coursemodel');
const Speaker = require('./models/speakermodel');
const CourseSpeaker = require('./models/coursespeakermodel');
const Topic = require('./models/topicmodel');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/topics', async (req, res) => {
    try {
        const topics = await Topic.find();
        res.json(topics);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Search endpoint with pagination
app.get('/search', async (req, res) => {
    try {
        const { query, topic, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;

        const searchCriteria = {};

        if (query) {
            searchCriteria.name = { $regex: query, $options: 'i' };
        }

        if (topic) {
            searchCriteria.topicId = topic;
        }

        if (minPrice && maxPrice) {
            searchCriteria['priceRange.min'] = { $gte: Number(minPrice) };
            searchCriteria['priceRange.max'] = { $lte: Number(maxPrice) };
        } else if (minPrice) {
            searchCriteria['priceRange.max'] = { $gte: Number(minPrice) };
        } else if (maxPrice) {
            searchCriteria['priceRange.min'] = { $lte: Number(maxPrice) };
        }

        let sortOption = {};
        if (sort === 'newest') {
            sortOption = { createdOn: -1 };
        } else if (sort === 'ascending') {
            sortOption = { 'priceRange.min': 1 };
        }

        const skip = (page - 1) * limit;
        const courses = await Course.find(searchCriteria)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))
            .populate('topicId');

        const courseIds = courses.map(course => course._id);
        const courseSpeakers = await CourseSpeaker.find({ courseId: { $in: courseIds } }).populate('speakerId');

        const coursesWithSpeakers = courses.map(course => {
            const speakers = courseSpeakers
                .filter(cs => cs.courseId.toString() === course._id.toString())
                .map(cs => cs.speakerId.name);
            return {
                ...course._doc,
                speakers
            };
        });

        const totalCourses = await Course.countDocuments(searchCriteria);

        res.json({
            total: totalCourses,
            page: Number(page),
            pages: Math.ceil(totalCourses / limit),
            courses: coursesWithSpeakers
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
