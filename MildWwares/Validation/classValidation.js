const { body , param , query } = require('express-validator');
const teacherShema = require('../../Model/teacherModel');
const childShema = require('../../Model/childModel');

exports.insertValidator = [
    // body("_id")
    // .isInt()
    // .withMessage("ID must be an Integer"),
    body("name")
    .isAlpha()
    .withMessage("name must be an String"),
    body("supervision")
    .isMongoId()
    .withMessage("supervision must be an Integer")
    .custom(
        async(value)=>{
            const supervisorExists = await teacherShema.exists({ _id: value });
            if(!supervisorExists){
                throw new Error("supervisor doesn't exist");
            }
            return true;
        }),
    body("childern")
    .isArray({min : 2})
    .withMessage("Childern must be at least two child")
    .custom(async(children)=>{
        
        const invalidID = [];
        for(let childID of children){
            const childExists = await childShema.exists({ _id: childID });
            if(!childExists){
                invalidID.push(childID);
            }
        }
        if(invalidID.length > 0){
            throw new Error(`child with id ${invalidID.join(', ')} doesn't exist in table Childs`);
        }
        return true;
    }),

];

exports.updateValidator = [
    body("_id")
    .isInt()
    .withMessage("ID must be an Integer"),
    body("name")
    .isAlpha()
    .optional()
    .withMessage("name must be an String"),
    body("supervision")
    .isMongoId()
    .optional()
    .withMessage("supervision must be an Integer"),
    body("childern.*")
    .isArray({min : 1})
    .optional()
    .withMessage("Childern must be an Integer")
    
]

exports.validateTeacherId = [
    param("id")
    .isMongoId()
    .withMessage("ID must be an MongoId"),
]


exports.validateId = [
    param("id")
    .isInt()
    .withMessage("ID must be an Integer"),
]