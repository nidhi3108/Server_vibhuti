const router= require("express").Router();
const speakermodel = require("../models/speakermodel")

router.post('/addspeaker',(req,res)=>{
    console.log(req.body);
    new speakermodel(req.body).save()
    .then((result)=>{
        console.log("speaker save");
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.json(err)
    })
})


module.exports=router