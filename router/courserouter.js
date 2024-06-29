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

// GET route to search for courses
router.get('/search', async (req, res) => {
    try {
        const { name, topicId, minPrice, maxPrice } = req.query;

        // Build a query object based on provided query parameters
        const query = {};
        
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }
        
        if (topicId) {
            query.topicId = topicId;
        }
        
        if (minPrice || maxPrice) {
            query['priceRange.min'] = { $gte: minPrice || 0 }; // Greater than or equal to minPrice
            query['priceRange.max'] = { $lte: maxPrice || Number.MAX_SAFE_INTEGER }; // Less than or equal to maxPrice
        }

        const courses = await Course.find(query);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports=router
