var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    //res.render('index', { title: 'Express' });
    res.setHeader('content-type', 'text/plain')
    //res.send('Index page for ACExpress API. Using /apis to obtain more.');
    res.end('Index page for ACExpress API. Using /apis to obtain more.');
});

module.exports = router;