const {body , param , query} = require('express-validator');
const teacherSchema = require('../../Model/teacherModel');
const bcrypt = require('bcrypt');

exports.insertValidator = [
    body("_id")
    .isMongoId()
    .withMessage("ID must be an Integer"),
    body("fullName")
    .isAlpha()
    .withMessage("fullName must be an String"),
    body("password")
    .isLength({min : 8 , max : 20})
    .withMessage("password must be between 8 and 20 characters and contain at least one lowercase character, one uppercase character, one number, and one special character")
    .custom((password , {req})=>{
        if(password !== req.body.passwordConfirm){
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
    body("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation is required"),
    body("email")
    .isEmail()
    .withMessage("email must be an Email"),
    body("image")
    .isEmpty()
    .withMessage("Must upload a profile image"),
    

];
exports.updateValidator = [
    body("_id")
    .isMongoId()
    .withMessage("ID must be an Integer"),
    body("fullName")
    .isAlpha()
    .optional()
    .withMessage("fullName must be an String"),
    body("password")
    .isLength({min : 8 , max : 20})
    .optional()
    .withMessage("password must be between 8 and 20 characters and contain at least one lowercase character, one uppercase character, one number, and one special character"),
    body("email")
    .isEmail()
    .optional()
    .withMessage("email must be an Email"),
    // body("image")
    // .isString()
    // .optional()
    // .withMessage("Must upload a profile image"),
];

exports.validateId = [
    param("id")
    .isMongoId()
    .withMessage("ID must be an MongoId"),
];
exports.changeTeacherPassword = [
    body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
    body("passwordConfirm")
    .notEmpty()
    .withMessage("Confirm password is required"),
    body("password")
    .notEmpty()
    .withMessage("New password is required")
    .custom(async (val , {req}) => {
        const teacher = await teacherSchema.findById(req.params.id);
        if(!teacher){
            throw new Error("Teacher doesn't found for this ID");
        }

        const isCorrectedPassword = await bcrypt.compare(
            req.body.currentPassword,
            teacher.password
        );
        if (!isCorrectedPassword) {
            throw new Error("Current password is not correct");
        }
        if(val !== req.body.passwordConfirm){
            throw new Error("Password confirmation does not match password");
        }
        return true;


    })
    
]