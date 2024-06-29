const {Types,Schema,model} = require('../connection')
const mongoose= require('mongoose')

const Courseschema= new Schema({
    id: String,
    name: String,
    topicId: mongoose.Schema.Types.ObjectId,
    priceRange: String,
    createdOn: { type: Date, default: Date.now }
})

const Coursemodel=model("Coursemodel", Courseschema)
module.exports=Coursemodel