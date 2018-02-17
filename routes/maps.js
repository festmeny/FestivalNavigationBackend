var express = require('express');
var router = express.Router();

router.get('/maps', function(req, res, next) {
    res.send("Get maps");
});

router.post('/maps', function(req, res, next) {
    res.send("Post map");
});

router.get('/maps/:mapId', function(req, res, next) {
    res.send("Get map with id of " + req.params.mapId);
});

router.put('/maps/:mapId', function(req, res, next) {
    res.send("Put map with id of " + req.params.mapId);
});

router.delete('/maps/:mapId', function(req, res, next) {
    res.send("Delete map with id of " + req.params.mapId);
});

module.exports = router;
