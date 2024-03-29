const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
     _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()// Using the default ObjectId generator
    },
    fullName: {type: String },
    password: {type: String},
    email : {type: String ,required : true ,  unique: true},
    image : {type: String},
    role: {type: String , enum: ["admin" , "teacher"] , default: "teacher" , required: true},
});

schema.pre('save' , async function (next) {
    if (!this.isModified('password')) return next();
    // hashing password
    this.password =await bcrypt.hash(this.password , 12);
} )

module.exports = mongoose.model("teachers" , schema);


//1 - build schema 
//2- register for schema in mongoose 