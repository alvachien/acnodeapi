var express = require('express');
var router = express.Router();

/* GET APIs listing. */
router.get('/', function (req, res) {
    // Show a html stream which contains the API list
    res.setHeader('content-type', 'text/plain')
    res.send('Apis list page. Currently supported API is: Todo (api/todo)');
});

module.exports = router;