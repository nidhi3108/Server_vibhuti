const {Types,Schema,model} = require('../connection')
const mongoose= require('mongoose')

const coursespeakerschema= new Schema({
    courseId: mongoose.Schema.Types.ObjectId,
    speakerId: mongoose.Schema.Types.ObjectId,
})

const coursespeakermodel=model("coursespeakermodel",coursespeakerschema)
module.exports=coursespeakermodel