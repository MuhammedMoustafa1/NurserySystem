const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const addressSchema = new mongoose.Schema(
    {
        city : String,
         street: Number,
        building : Number 

    },
    {_id : false}
);


const schema = new mongoose.Schema({
    _id : {type : Number} ,
    fullName : {type : String},
    age : {type : Number} ,
    level : {type  :String , enum : ['PreKG', 'KG1', 'KG2']} ,
    address  : addressSchema,
    image : {type : String}

});

try {
    schema.plugin(AutoIncrement, { id: "child", incField: "_id" });
} catch (error) {
    console.error("Failed to add auto-increment plugin:", error);
    // If failed, do not add the _id field
    schema.remove('_id');
}

module.exports = mongoose.model("child" , schema);