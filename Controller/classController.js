const classSchema = require("../Model/classModel");

const childShema  = require("../Model/childModel");

exports.getAllClasses = (request , response , next)=>{
    // response.status(200).json({ data: [] });
    classSchema
        .find({})
        .populate({ path: "supervision" , select: {fullName: 1 , _id:0}})
        .populate({ path: "childern" , select: {fullName: 1 , _id:0}})
        .then((data) =>{
            response.status(200).json({data});
        })
        .catch((error) => next(error));
};

exports.getClassById = (request , response , next)=>{
    // response.status(200).json({ data: request.params });
    classSchema
        .findOne({_id : request.params.id})
        .populate({ path: "supervision" , select: {fullName: 1 , _id:0}})
        .populate({ path: "childern" , select: {fullName: 1 , _id:0}})
        .then((object) => {
            if (!object)
                throw new Error ("Classs doesn't exist ");
            response.status(200).json({object})
        })
        .catch((error) => next(error));
};

exports.insertClass = (request , response , next)=>{
    // console.log(request.body);
    // response.status(200).json({data : "Added Sussefully"});
    let object = new classSchema(request.body);
    object
        .save()
        .then((data) => {
            response.status(200).json({data})
        })
        .catch((error) => next(error));
};

exports.updateClass = (request , response , next)=>{
    // response.status(200).json({data : "Updated Sussefully"});
    classSchema
        .findByIdAndUpdate( request.body._id, request.body , {new : true})
        .then((data) => {
            if (!data)
                throw new Error ("Class doesn't exist ");
            response.status(200).json("records updated sussefully")
        })
        .catch((error) => next(error));
};
exports.deleteClass = (request , response , next)=>{
    // response.status(200).json({data : "Deleted Sussefully"});
    classSchema  
        .findByIdAndDelete(request.params.id)
        .then((data) => {
            response.status(200).json({data})
        })
        .catch((error) => next(error));
};

exports.getChildInfo = (request , response , next)=>{
        
        // response.status(200).json({id: request.params.id});
        classSchema.findOne({_id : request.params.id})
        .populate({
            path:'childern',
            select: {fullName: 1 , _id:0}
        })
        .then((object)=> {
            if (!object)
                throw new Error ("Class doesn't exist ");
            response.status(200).json({object})
        })
        .catch((error) => next(error));
};


exports.getTeacherInfo = (request , response , next)=>{
    
    // response.status(200).json({id: request.params.id});
    classSchema.findById(request.params.id)
    .populate('supervision')
    .then((object) => {
        if (!object)
            throw new Error ("Class doesn't exist ");
        response.status(200).json({object})
    })
    .catch((error) => next(error));
};