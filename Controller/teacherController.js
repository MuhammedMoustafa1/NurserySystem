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
        image : request.file.filename,
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



exports.deleteTeacher = async (req, res, next) => {
    const id = req.params.id;

    try {
        // Find the teacher to be deleted
        const teacher = await teacherSchema.findById(id);
        if (!teacher) {
            res.status(404).json({ data: "Teacher not found" });
        }

        // Check if the teacher is supervising any classes
        const classes = await classSchema.find({ supervisor: id });

        if (classes.length > 0) {
            const defaultSupervisor = await teacherSchema.findOne({ _id: { $ne: id } });;

            await classSchema.updateMany({ supervisor: id }, { supervisor: defaultSupervisor._id });
        }

        // Proceed with teacher deletion
        await teacherSchema.findByIdAndDelete(id);

        res.status(200).json({ data: "Teacher deleted" });
    } catch (err) {
        next(err);
    }
};