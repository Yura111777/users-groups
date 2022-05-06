const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.patch('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
module.exports = router;