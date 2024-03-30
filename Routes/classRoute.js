const express = require('express');
const classController = require('./../Controller/classController');
const { insertValidator , updateValidator , validateId, validateTeacherId } = require('./../MildWwares/Validation/classValidation');
const validationResult = require('./../MildWwares/Validation/validationResult');
const {isAdmin , isTeacher} = require('../MildWwares/authenticationMW');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: The unique identifier for the class
 *         name:
 *           type: string
 *           description: The name of the class
 *         supervision:
 *           type: string
 *           format: uuid
 *           description: The ID of the teacher supervising the class
 *         children:
 *           type: array
 *           items:
 *             type: number
 *           description: The IDs of the children in the class
 */



/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes in the database
 *     description: Get all classes in the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Classes
 *     responses:
 *       '200': 
 *         description: A successful response with an array of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Add a new class
 *     description: Add a new class to the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Classes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '201': 
 *         description: Class created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *   patch:
 *     summary: Update a class
 *     description: Update an existing class in the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Classes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the class to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '200': 
 *         description: Class updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Class not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete a class
 *     description: Delete a class from the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Classes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the class to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200': 
 *         description: Class deleted successfully
 *       '404':
 *         description: Class not found
 *       '500':
 *         description: Internal server error
 * 
 * /class/{id}:
 *   get:
 *     summary: Get a class by ID
 *     description: Get a class by its ID from the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Classes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the class to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200': 
 *         description: A successful response with the class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       '404':
 *         description: Class not found
 *       '500':
 *         description: Internal server error
 * 
 * /class/child/{id}:
 *   get:
 *     summary: Get information about a child in a class
 *     description: Get information about a child in a class from the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Classes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the class
 *         schema:
 *           type: string
 *     responses:
 *       '200': 
 *         description: A successful response with information about the child
 *       '404':
 *         description: Child not found in the class
 *       '500':
 *         description: Internal server error
 * 
 * /class/teacher/{id}:
 *   get:
 *     summary: Get information about a teacher supervising a class
 *     description: Get information about a teacher supervising a class from the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Classes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the class
 *         schema:
 *           type: string
 *     responses:
 *       '200': 
 *         description: A successful response with information about the teacher
 *       '404':
 *         description: Teacher not found for the class
 *       '500':
 *         description: Internal server error
 */



router  
    .route('/class')
    .all(isAdmin)
    .get(classController.getAllClasses)
    .post(insertValidator ,validationResult,classController.insertClass)
    .patch(updateValidator , validationResult ,classController.updateClass)
    .delete(classController.deleteClass);



    router.delete('/class/:id',isAdmin , validateId, validationResult, classController.deleteClass);
    
    router.route('/class/:id').get(isAdmin,validateId , validationResult ,classController.getClassById);

    router.get("/class/child/:id" ,isAdmin ,  validateId, validationResult,  classController.getChildInfo);

    router.get("/class/teacher/:id" ,isAdmin, validateTeacherId, validationResult,  classController.getTeacherInfo);


    module.exports = router;
    