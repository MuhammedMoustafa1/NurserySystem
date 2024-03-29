const bcrypt = require('bcrypt');
const {body , param , query} = require('express-validator');




exports.registerValidator = [
    
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
    
    

];

exports.loginValidator = [
    body("email")
    .isEmail()
    .notEmpty()
    .withMessage("email must be an Email"),

]