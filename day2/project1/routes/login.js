var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send("login -> get");
});

router.post('/', function(req, res){
    res.send('login -> post');
});

module.exports = router;