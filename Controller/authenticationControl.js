const { response } = require('express');
const teacherSchema = require('../Model/teacherModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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


exports.login = async (request, response, next) => {
    try {
        const object = await teacherSchema.findOne({ email: request.body.email });

        if (!object || !(await bcrypt.compare(request.body.password, object.password))) {
            throw new Error("Incorrect email or password");
        }

        const token = jwt.sign({
            _id: object._id,
            role: object.role
        },
            process.env.SECRETKEY,
            { expiresIn: "1h" }
        );

        response.json({ data: "Authenticated", token });
    } catch (error) {
        next(error);
    }
}
