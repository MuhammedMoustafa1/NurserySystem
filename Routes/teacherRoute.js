const express = require('express');
const teacherController = require('./../Controller/teacherController');
const {insertValidator, updateValidator , validateId , changeTeacherPassword} = require('./../MildWwares/Validation/teacherValidation');
const validationResult = require('./../MildWwares/Validation/validationResult');
const {isAdmin} = require('../MildWwares/authenticationMW');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the teacher
 *         fullName:
 *           type: string
 *           description: The full name of the teacher
 *         email:
 *           type: string
 *           description: The email address of the teacher
 *         password:
 *           type: string
 *           description: The password of the teacher
 *         image:
 *           type: string
 *           description: The image URL of the teacher
 *         role:
 *           type: string
 *           enum: ["admin", "teacher"]
 *           default: "teacher"
 *           description: The role of the teacher
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers in the database
 *     description: Get all teachers in the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Teachers
 *     responses:
 *       200: 
 *         description: A successful response to test the GET method
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Add a new teacher
 *     description: Add a new teacher to the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Teachers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201: 
 *         description: Teacher created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update a teacher
 *     description: Update an existing teacher in the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the teacher to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200: 
 *         description: Teacher updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a teacher
 *     description: Delete a teacher from the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the teacher to delete
 *         schema:
 *           type: string
 *     responses:
 *       200: 
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 * 
 * /teachers/supervision:
 *   get:
 *     summary: Get all teacher supervisions
 *     description: Get all teacher supervisions from the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Teachers
 *     responses:
 *       200: 
 *         description: A successful response to get all teacher supervisions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 *       500:
 *         description: Internal server error
 * 
 * /teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     description: Get a teacher by its ID from the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */



router
    .route('/teachers')
    .all(isAdmin)
    .get(teacherController.getAllTeachers)
    .post(insertValidator , validationResult ,teacherController.insertTeacher)
    .patch(updateValidator , validationResult ,teacherController.updateTeacher)
    .delete(teacherController.deleteTeacher);

router.get('/teachers/supervision' , teacherController.getAllSupervesions);
router.delete('/teachers/:id', validateId, validationResult, teacherController.deleteTeacher);    
router.route('/teachers/:id').get(validateId, validationResult, teacherController.getTeacherById);
router.patch('/teachers/changePassword/:id' ,changeTeacherPassword, validationResult, teacherController.changeTeacherPassword)



module.exports = router;