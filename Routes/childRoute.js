const express = require('express');
const childController = require('./../Controller/ChildController');
const { insertValidator ,updateValidator , validateId} = require('./../MildWwares/Validation/childValidation');
const validationResult = require('./../MildWwares/Validation/validationResult');
const {isAdmin , isTeacher} = require('../MildWwares/authenticationMW');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           description: The city where the child lives
 *         street:
 *           type: number
 *           description: The street number of the child's address
 *         building:
 *           type: number
 *           description: The building number of the child's address
 *       required:
 *         - city
 *         - street
 *         - building
 *     
 *     Child:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: The unique identifier for the child
 *         fullName:
 *           type: string
 *           description: The full name of the child
 *         age:
 *           type: number
 *           description: The age of the child
 *         level:
 *           type: string
 *           enum: ['PreKG', 'KG1', 'KG2']
 *           description: The education level of the child
 *         address:
 *           $ref: '#/components/schemas/Address'
 *           description: The address of the child
 *         image:
 *           type: string
 *           description: The image URL of the child
 *       required:
 *         - fullName
 *         - age
 *         - level
 *         - address
 */

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Get all children in the database
 *     description: Get all children in the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Children
 *     responses:
 *       '200': 
 *         description: A successful response with an array of children
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Add a new child
 *     description: Add a new child to the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Children
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       '201': 
 *         description: Child created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *   patch:
 *     summary: Update a child
 *     description: Update an existing child in the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Children
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the child to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       '200': 
 *         description: Child updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete a child
 *     description: Delete a child from the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Children
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the child to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200': 
 *         description: Child deleted successfully
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal server error
 * 
 * /child/{id}:
 *   get:
 *     summary: Get a child by ID
 *     description: Get a child by its ID from the database
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Children
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the child to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200': 
 *         description: A successful response with the child
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal server error
 */





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
    