const childSchema = require("../Model/childModel");
const classSchema  = require("../Model/classModel")

exports.getAllChilderns = (request , response , next)=>{
    //response.status(200).json({ data: [] });
    childSchema
    .find({})
    .then((data) => {
        response.status(200).json({data})
    })
    .catch((error) => next(error));
};

exports.getChildById = (request , response , next)=>{
    // response.status(200).json({ data: request.params });
    childSchema
    .findOne({_id : request.params.id})
    .then((object) => {
        if (!object)
            throw new Error ("Child doesn't exist");
        response.status(200).json([object]);
    })
    .catch((error) => next(error));
};

exports.insertChild = (request , response , next)=>{
    // console.log(request.body);
    // response.status(200).json({data : "Added Sussefully"});
    let object = new childSchema({
        _id : request.body._id,
        fullName : request.body.fullName,
        age : request.body.age,
        address : {
            city : request.body.address.city,
            street : request.body.address.street,
            building : request.body.address.building
        },
        
        image : request.file.filename
    });
    object
    .save()
    .then((data) => {
        response.status(200).json({data})
    })
    .catch ((error) => next(error));
};

exports.updateChild = (request , response , next)=>{
    // response.status(200).json({data : "Updated Sussefully"});
    childSchema
    .findByIdAndUpdate( request.body._id,request.body , {new : true})
    .then((data) => {
        if (!data)
            throw new Error ("Child doesn't exist");
        response.status(200).json("records updated sussefully")
    })
    .catch((error) => next(error));
};




exports.deleteChild = async(req, res, next) => {
    try {
        const id = req.params.id;
        const classOfChild = await classSchema.findOne({ children: id });
        if (classOfChild) {
            classOfChild.children.pull(id);
            await classOfChild.save();
        }
        childSchema.findByIdAndDelete(id)
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "Child not found" });
                }
                res.status(200).json({ data: "deleted" });
            })
            
    } catch (error) {
        next(error);
    }
    

};