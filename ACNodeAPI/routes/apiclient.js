var express = require('express');
var router = express.Router();
var authController = require('../controller/authcontroller');
var clientController = require('../controller/clientcontroller');

router.route('/')
    .get(authController.isAuthenticated, clientController.getClients)
    .post(clientController.createClient);

router.route('/:id')
    .get(authController.isAuthenticated, clientController.readClient)
    ;

module.exports = router;