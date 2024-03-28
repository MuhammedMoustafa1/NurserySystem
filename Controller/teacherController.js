const teacherSchema = require('../Model/teacherModel');
const classSchema = require('../Model/classModel');
const bcrypt = require('bcrypt');
const { request } = require('express');

exports.getAllTeachers = (request , response , next)=>{
    //response.status(200).json({ data: [] });
    teacherSchema
    .find({})
    .then((data) => {
        response.status(200).json({ data});
    })
    .catch((error) => next(error));
}; 

exports.getTeacherById = (request , response , next)=>{
    // response.status(200).json({ data: request.params });

    teacherSchema
    .findById(request.params.id)
    .then((data) => {
        if (!data )
            throw new Error ("Teacher doesn not exist");
        response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.insertTeacher = (request , response , next)=>{

    //response.json({body: request.body , file:request.file});
     //console.log(request.body);
    // response.status(200).json({data : "Added Sussefully"});
    let object = new teacherSchema({
        _id : request.body._id,
        fullName : request.body.fullName,
        email: request.body.email,
        password : request.body.password,
        image : request.file.filename,
        role : request.body.role

    });
    object
    .save()
    .then((data) => {
        console.log("Added sussefully")
        response.status(200).json({data}); 
    })
    .catch((error) => next(error));
};

exports.updateTeacher = (request , response , next)=>{
    // response.status(200).json({data : "Updated Sussefully"});
    teacherSchema
    .findByIdAndUpdate(request.body._id , {
        fullName: request.body.fullName,
        email: request.body.email,
        image : request.body.image,
        role: request.body.role
    }, {new : true})
    .then( (data) => {
        if (!data)
            response.status(304).json({data : "Teacher not found"})
        response.status(200).json("records updated sussefully");
    })
    .catch((error) => next(error));
};


exports.changeTeacherPassword = async (request, response, next) => {
    const document = await teacherSchema
    .findByIdAndUpdate(request.params.id , {
        password:await bcrypt.hash(request.body.password , 10) 
        
    }, {new : true})
    .then( (data) => {
        if (!data)
            response.status(304).json({data : "Teacher not found"})
        response.status(200).json("Password updated sussefully");
    })
    .catch((error) => next(error));
};


// exports.changeUserPassword = (req, res, next) => {
//   const id = req.body.id;
//   const hash = bcrypt.hashSync(req.body.password, 10);
//   teacher.updateOne({ _id: id }, { password: hash })
//     .then((data) => {
//       if (data.matchedCount === 0) {
//         let error = new Error("this teacher id doesn't exist");
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({ message: "password updated successfully" });
//     })
//     .catch((error) => next(error));
// }

exports.getAllSupervesions = (request , response , next)=>{
    // response.status(200).json({ data: [] }); 
    classSchema.find({})
    .populate({
        path: 'supervision',
        select: {fullName: 1}
}
    )
    .then(data => {
        let supervisors = data.map(item => item.supervision);
        response.status(200).json({supervisors});
    })
    .catch((error) => next(error));
}

exports.deleteTeacher = (request , response , next)=>{
    // response.status(200).json({data : "Deleted Sussefully"});
    teacherSchema
    .findByIdAndDelete(request.params.id)
    .then((data) => {
        response.status(200).json( "Deleted Sussefully");
    })
    .catch((error) => next(error));
}