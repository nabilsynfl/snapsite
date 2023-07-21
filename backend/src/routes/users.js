const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.js');
const {verifyUsers,  verifyAdmin} = require('../middleware/authUsers.js');

//READ USERS
router.get('/', verifyUsers, verifyAdmin, usersController.getAllUsers)

//GET USERS BY ID
router.get('/:id', verifyUsers, verifyAdmin, usersController.getUsersById)

//CREATE USERS
router.post('/', verifyUsers, verifyAdmin, usersController.createNewUsers)

//UPDATE USERS
router.patch('/:id', verifyUsers, verifyAdmin, usersController.updateUsers)

//DELETE USERS
router.delete('/:id', verifyUsers, verifyAdmin, usersController.deleteUsers)

module.exports = router