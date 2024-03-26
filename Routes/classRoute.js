const express = require('express');
const classController = require('./../Controller/classController');
const { insertValidator , updateValidator , validateId, validateTeacherId } = require('./../MildWwares/Validation/classValidation');
const validationResult = require('./../MildWwares/Validation/validationResult');

const router = express.Router();

router  
    .route('/class')
    .get(classController.getAllClasses)
    .post(insertValidator ,validationResult,classController.insertClass)
    .patch(updateValidator , validationResult ,classController.updateClass)
    .delete(classController.deleteClass);



    router.delete('/class/:id', validateId, validationResult, classController.deleteClass);
    
    router.route('/class/:id').get(validateId , validationResult ,classController.getClassById);

    router.get("/class/child/:id" , validateId, validationResult,  classController.getChildInfo);

    router.get("/class/teacher/:id" , validateTeacherId, validationResult,  classController.getTeacherInfo);


    module.exports = router;
    