const {Types,Schema,model} = require('../connection')

const speakerschema= new Schema({
    id: String,
    name:String
})

const speakermodel=model("speakermodel",speakerschema)
module.exports=speakermodel