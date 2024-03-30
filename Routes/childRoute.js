const express = require('express');
const childController = require('./../Controller/ChildController');
const { insertValidator ,updateValidator , validateId} = require('./../MildWwares/Validation/childValidation');
const validationResult = require('./../MildWwares/Validation/validationResult');
const {isAdmin , isTeacher} = require('../MildWwares/authenticationMW');



const router = express.Router();

router
    .route('/child')
    .all(isAdmin)
    .get(childController.getAllChilderns)
    .post(insertValidator, validationResult, childController.insertChild)
    .patch(updateValidator , validationResult , childController.updateChild)
    .delete(childController.deleteChild);



router.delete('/child/:id',isAdmin , validateId, validationResult, childController.deleteChild);
router.route('/child/:id').get( isAdmin , validateId , validationResult ,childController.getChildById);    

module.exports = router;
    