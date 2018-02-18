var express = require('express');
var router = express.Router();

var Map = require('../models/map');

var getMapList = require('../middleware/maps/getMapList');
var createMap = require('../middleware/maps/createMap');
var getMap = require('../middleware/maps/getMap');
var updateMap = require('../middleware/maps/updateMap');
var deleteMap = require('../middleware/maps/deleteMap');

var validateMap = require('../middleware/maps/validateMap');

var renderMap = require('../middleware/render/renderMap');
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
    renderMap
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
