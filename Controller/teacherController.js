const teacherSchema = require('../Model/teacherModel');
const classSchema = require('../Model/classModel');

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
        if (!data)
            throw new Error ("Teacher doesn not exist");
        response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.insertTeacher = (request , response , next)=>{
     console.log(request.body);
    // response.status(200).json({data : "Added Sussefully"});
    let object = new teacherSchema(request.body);
    object
    .save()
    .then((data) => {
        response.status(200).json({data});
    })
    .catch((error) => next(error));
};

exports.updateTeacher = (request , response , next)=>{
    // response.status(200).json({data : "Updated Sussefully"});
    teacherSchema
    .findByIdAndUpdate(request.body._id , request.body , {new : true})
    .then( (data) => {
        if (!data)
            response.status(304).json({data : "Teacher not found"})
        response.status(200).json("records updated sussefully");
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

exports.deleteTeacher = (request , response , next)=>{
    // response.status(200).json({data : "Deleted Sussefully"});
    teacherSchema
    .findByIdAndDelete(request.params.id)
    .then((data) => {
        response.status(200).json( "Deleted Sussefully");
    })
    .catch((error) => next(error));
}