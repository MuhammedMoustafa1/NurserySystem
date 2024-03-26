const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: Number , 
    name: {type : String},
    supervision : {type : mongoose.Schema.Types.ObjectId , ref : "teachers"},
    childern : [{type : Number , ref : "child"}]
    
});

module.exports = mongoose.model("class" , schema);