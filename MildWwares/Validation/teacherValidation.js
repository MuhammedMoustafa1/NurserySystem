const {body , param , query} = require('express-validator');

exports.insertValidator = [
    // body("_id")
    // .isMongoId()
    // .withMessage("ID must be an Integer"),
    // body("fullName")
    // .isAlpha()
    // .withMessage("fullName must be an String"),
    // body("password")
    // .isLength({min : 8 , max : 20})
    
    // .withMessage("password must be between 8 and 20 characters and contain at least one lowercase character, one uppercase character, one number, and one special character"),
    // body("email")
    // .isEmail()
    // .withMessage("email must be an Email"),
    // body("image")
    // .isString()
    // .withMessage("Must upload a profile image"),
    

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
    body("image")
    .isString()
    .optional()
    .withMessage("Must upload a profile image"),
];

exports.validateId = [
    param("id")
    .isMongoId()
    .withMessage("ID must be an MongoId"),
]