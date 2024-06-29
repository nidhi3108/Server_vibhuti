const router= require("express").Router();
const course = require('../models/coursemodel');

router.post('/courseadd',(req,res)=>{
    console.log(req.body);
    new course(req.body).save()
    .then((result)=>{
        console.log("coursedata save");
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.json(err)
    })
})

router.get('/search', async (req, res) => {
    try {
        const { query, topic, minPrice, maxPrice, sort } = req.query;

        // Build the query object
        const searchQuery = {};
        if (query) {
            searchQuery.name = { $regex: query, $options: 'i' }; // Case-insensitive search
        }
        if (topic) {
            searchQuery.topicId = topic;
        }
        if (minPrice || maxPrice) {
            searchQuery['priceRange.min'] = { $gte: minPrice || 0 };
            searchQuery['priceRange.max'] = { $lte: maxPrice || Number.MAX_SAFE_INTEGER };
        }

        // Build the sort object
        let sortOption = { createdOn: -1 }; // Default to newest
        if (sort === 'ascending') {
            sortOption = { createdOn: 1 };
        }

        const courses = await Course.find(searchQuery).sort(sortOption);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports=router
