const express = require('express');
const router = express.Router();
const {login} = require('../Controller/authenticationControl');

router.route('/login').post(login);

module.exports = router;