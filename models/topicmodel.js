const {Types,Schema,model} = require('../connection')

const topicschema= new Schema({
    id: String,
    name:String
})

const topicmodel=model("topics",topicschema)
module.exports=topicmodel