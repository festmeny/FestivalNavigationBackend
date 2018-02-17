var express = require('express');
var router = express.Router();

router.get('/maps/:mapId/controls', function(req, res, next) {
    res.send("Get control points of map with mapId of " + req.params.mapId);
});

router.post('/maps/:mapId/controls', function(req, res, next) {
    res.send("Post control point for map with mapId of " + req.params.mapId);
});

router.put('/controls/:controlId', function(req, res, next) {
    res.send("Put control point with id of " + req.params.controlId);
});

router.delete('/controls/:controlId', function(req, res, next) {
    res.send("Delete control point with id of " + req.params.controlId);
});

module.exports = router;
