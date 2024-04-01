const express = require('express');
const router = express.Router();
const {login , register} = require('../Controller/authenticationControl');
const {registerValidator , loginValidator} = require('../MildWwares/Validation/authenticationValidation');
const validationResult = require('./../MildWwares/Validation/validationResult');


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered a teacher
 *       400:
 *         description: Bad request
 */

router.route('/register').post(registerValidator , validationResult ,register)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login as a teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized
 */

router.route('/login').post( loginValidator , validationResult,login);

module.exports = router;