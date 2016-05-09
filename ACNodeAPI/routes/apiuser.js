var express = require('express');
var router = express.Router();
var authController = require('../controller/authcontroller');
var userController = require('../controller/usercontroller');

router.route('/logon')
    .post(userController.logonUser);

router.route('/')
    .get(authController.isAuthenticated, userController.getUsers)
    .post(userController.registerUser);

router.route('/:id')
    .get(authController.isAuthenticated, userController.readUser)
    .put(authController.isAuthenticated, userController.updateUser)
    .delete(authController.isAuthenticated, userController.deleteUser);

module.exports = router;