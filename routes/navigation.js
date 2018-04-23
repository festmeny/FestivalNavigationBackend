var express = require('express');
var router = express.Router();

var validateNavigation = require('../middleware/navigation/validateNavigation');
var getDestinationPoint = require('../middleware/navigation/getDestinationPoint');
var getEdgesForNavigation = require('../middleware/navigation/getEdgesForNavigation');
var getPointsForNavigation = require('../middleware/navigation/getPointsForNavigation');
var graphSeach = require('../middleware/navigation/graphSearch');
var renderNavigation = require('../middleware/render/renderNavigation');

router.get('/navigation',
    validateNavigation,
    getDestinationPoint,
    getEdgesForNavigation,
    getPointsForNavigation,
    graphSeach,
    renderNavigation
);

module.exports = router;
