const router= require("express").Router();

const coursespeakermodel = require('../models/coursespeakermodel');

router.post('/coursespeakeradd',(req,res)=>{
    console.log(req.body);
    new coursespeakermodel(req.body).save()
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