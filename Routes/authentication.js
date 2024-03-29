const express = require('express');
const router = express.Router();
const {login , register} = require('../Controller/authenticationControl');
const {registerValidator , loginValidator} = require('../MildWwares/Validation/authenticationValidation');
const validationResult = require('./../MildWwares/Validation/validationResult');



router.route('/register').post(registerValidator , validationResult ,register)
router.route('/login').post( loginValidator , validationResult,login);

module.exports = router;