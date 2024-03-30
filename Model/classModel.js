const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const schema = new mongoose.Schema({
    _id: {type : Number} , 
    name: {type : String},
    supervision : {type : mongoose.Schema.Types.ObjectId , ref : "teachers"},
    childern : [{type : Number , ref : "child"}]
    
});


schema.plugin(autoIncrement, { id: "class", incField:"_id" });


module.exports = mongoose.model("class" , schema);