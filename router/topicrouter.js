const router= require("express").Router();
const topicmodel = require('../models/topicmodel');

router.post('/add',(req,res)=>{
    console.log(req.body);
    new topicmodel(req.body).save()
    .then((result)=>{
        console.log("topic data save");
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.json(err)
    })
})



module.exports=router
