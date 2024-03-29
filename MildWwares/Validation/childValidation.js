const {body , param , query} = require('express-validator');

exports.insertValidator = [
    body("_id")
    .isInt()
    .withMessage("ID must be an Integer"),
    body("fullName")
    .isAlpha()
    .withMessage("fullName must be an String"),
    // body("age")
    // .isInt({min : 5 , max : 10})
    // .withMessage("age must be an Integer"),
    
    body("level")
    .isIn(['PreKG', 'KG1', 'KG2'])
    .withMessage("Level must be one of: PreKG, KG1, KG2"),

    body("address.city")
    .notEmpty()
    .withMessage("City is required"),

    body("address.street")
    .notEmpty()
    .withMessage("Street is required"),

    body("address.building")
    .notEmpty()
    .isInt()
    .withMessage("Building is required")

];


exports.updateValidator = [
    body("_id")
    .isInt()
    .withMessage("ID must be an Integer"),
    body("fullName")
    .isAlpha()
    .optional()
    .withMessage("fullName must be an String"),
    body("age")
    .isInt({min : 5 , max : 10})
    .optional()
    .withMessage("age must be an Integer"),
    body("level")
    .isIn(['PreKG', 'KG1', 'KG2'])
    .optional()
    .withMessage("Level must be one of: PreKG, KG1, KG2"),

    body("address.city")
    .notEmpty()
    .optional()
    .withMessage("City is required"),

    body("address.street")
    .notEmpty()
    .optional()
    .withMessage("Street is required"),
    
    body("address.building")
    .notEmpty()
    .optional()
    .isInt()
    .withMessage("Building is required")

];

exports.validateId = [
    param("id")
    .isInt()
    .withMessage("ID must be an Integer")
];

