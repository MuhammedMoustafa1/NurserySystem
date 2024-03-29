const { response } = require('express');
const teacherSchema = require('../Model/teacherModel');
const jwt = require('jsonwebtoken');

exports.register = async(request , response , next) => {
    const teacher = await new teacherSchema({
       // _id: request.body._id,
        fullName: request.body.fullName,
        password: request.body.password,
        email: request.body.email,
        image: request.file.filename,
        role: request.body.role
    })
    .save()
    .then((teacherDoc) => {
        const token = jwt.sign({
        id : teacherDoc._id
    },
    process.env.SECRETKEY,
    {expiresIn : "1h"}
    );

response.status(200).json({ message: "teacher created", token: token });

    })
    .catch(error => next(error));
    
    


}


exports.login = (request , response , next ) => {
    teacherSchema.findOne({
        fullName: request.body.fullName,
        password: request.body.password
    })
    .then(object => {
        if (!object)
            throw new Error ("Teacher doen not exist");

        let token = jwt.sign({
            _id : object._id,
            role: object.role
        },
        process.env.SECRETKEY,
        {expiresIn : "1h"}
        ) 
        //console.log(request);
        response.json({data: "Authenticated", token});   
    })
    .catch(error => next(error));
}