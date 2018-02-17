var express = require('express');
var router = express.Router();

router.get('/navigation', function(req, res, next) {
    res.send("Get navigation");
});

module.exports = router;
