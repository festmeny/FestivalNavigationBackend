var express = require('express');
var router = express.Router();

var getMapList = require('../middleware/maps/getMapList');
var createMap = require('../middleware/maps/createMap');
var getMap = require('../middleware/maps/getMap');
var updateMap = require('../middleware/maps/updateMap');
var deleteMap = require('../middleware/maps/deleteMap');
var getControlList = require('../middleware/controls/getControlList');
var getInterestList = require('../middleware/interests/getInterestList');
var getAllEdges = require('../middleware/edge/getAllEdges');

var validateMap = require('../middleware/maps/validateMap');

var renderMap = require('../middleware/render/renderMap');
var renderExtendedMap = require('../middleware/render/renderExtendedMap');
var renderMapList = require('../middleware/render/renderMapList');

router.get('/maps',
    getMapList,
    renderMapList
);

router.post('/maps',
    validateMap,
    createMap,
    renderMap
);

// TODO: Make extended get and render
router.get('/maps/:mapId', 
    getMap,
    getControlList,
    getInterestList,
    getAllEdges,
    renderExtendedMap
);

router.put('/maps/:mapId',
    validateMap,
    updateMap
);

router.delete('/maps/:mapId',
    getMap,
    deleteMap
);

module.exports = router;
