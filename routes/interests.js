var express = require('express');
var router = express.Router();

router.get('/maps/:mapId/interests', function(req, res, next) {
    res.send("Get interest points of map with mapId of " + req.params.mapId);
});

router.post('/maps/:mapId/interests', function(req, res, next) {
    res.send("Post interest point for map with mapId of " + req.params.mapId);
});

router.put('/interests/:interestId', function(req, res, next) {
    res.send("Put interest point with id of " + req.params.interestId);
});

router.delete('/interests/:interestId', function(req, res, next) {
    res.send("Delete interest point with id of " + req.params.interestId);
});

module.exports = router;
