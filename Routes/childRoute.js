const express = require('express');
const childController = require('./../Controller/ChildController');
const { insertValidator ,updateValidator , validateId} = require('./../MildWwares/Validation/childValidation');
const validationResult = require('./../MildWwares/Validation/validationResult');

const router = express.Router();

router
    .route('/child')
    .get(childController.getAllChilderns)
    .post(insertValidator, validationResult, childController.insertChild)
    .patch(updateValidator , validationResult , childController.updateChild)
    .delete(childController.deleteChild);



router.delete('/child/:id', validateId, validationResult, childController.deleteChild);
router.route('/child/:id').get(validateId , validationResult ,childController.getChildById);    

module.exports = router;
    