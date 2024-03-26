const teacherSchema = require('../Model/teacherModel');
const jwt = require('jsonwebtoken');

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