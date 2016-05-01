var express = require('express');
var router = express.Router();
var authController = require('../controller/authcontroller');
var todoController = require('../controller/todoitemcontroller');

router.route('/')
    .get(authController.isAuthenticated, todoController.getTodoItems)
    .post(authController.isAuthenticated, todoController.createTodoItem);

router.route('/:id')
    .get(authController.isAuthenticated, todoController.readTodoItem)
    .put(authController.isAuthenticated, todoController.updateTodoItem)
    .delete(authController.isAuthenticated, todoController.deleteTodoItem);

module.exports = router;