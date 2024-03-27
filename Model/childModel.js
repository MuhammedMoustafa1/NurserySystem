const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
        city : String,
         street: Number,
        building : Number 

    },
    {_id : false}
);


const schema = new mongoose.Schema({
    _id : Number ,
    fullName : {type : String},
    age : {type : Number} ,
    level : {type  :String , enum : ['PreKG', 'KG1', 'KG2']} ,
    address  : addressSchema,
    image : {type : String}

});

module.exports = mongoose.model("child" , schema);