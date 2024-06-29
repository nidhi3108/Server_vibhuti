const {Types,Schema,model} = require('../connection')
const mongoose= require('mongoose')

const Courseschema= new Schema({
    id: String,
    name: String,
    topicId: mongoose.Schema.Types.ObjectId,
    priceRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    createdOn: { type: Date, default: Date.now }
})

const Coursemodel=model("course", Courseschema)
module.exports=Coursemodel