const express = require('express');
const teacherController = require('./../Controller/teacherController');
const {insertValidator, updateValidator , validateId } = require('./../MildWwares/Validation/teacherValidation');
const validationResult = require('./../MildWwares/Validation/validationResult');
const {isAdmin} = require('../MildWwares/authenticationMW');
const router = express.Router();

router
    .route('/teachers')
    // .all(isAdmin)
    .get(teacherController.getAllTeachers)
    .post(insertValidator , validationResult ,teacherController.insertTeacher)
    .patch(updateValidator , validationResult ,teacherController.updateTeacher)
    .delete(teacherController.deleteTeacher);

router.get('/teachers/supervision' , teacherController.getAllSupervesions);
router.delete('/teachers/:id', validateId, validationResult, teacherController.deleteTeacher);    
router.route('/teachers/:id').get(validateId, validationResult, teacherController.getTeacherById);
router.patch('/teachers/changePassword/:id' , teacherController.changeTeacherPassword)



module.exports = router;