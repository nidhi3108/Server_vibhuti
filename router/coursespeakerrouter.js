const router= require("express").Router();

const course_speaker = require('../models/coursespeakermodel');

router.post('/coursespeakeradd',(req,res)=>{
    console.log(req.body);
    new course_speaker(req.body).save()
    .then((result)=>{
        console.log("course speaker data save");
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.json(err)
    })
})


module.exports=router