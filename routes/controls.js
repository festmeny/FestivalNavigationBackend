var express = require('express');
var router = express.Router();

var getControl = require('../middleware/controls/getControl');
var getControlList = require('../middleware/controls/getControlList');
var createControl = require('../middleware/controls/createControl');
var updateControl = require('../middleware/controls/updateControl');
var deleteControl = require('../middleware/controls/deleteControl');
var validateControl = require('../middleware/controls/validateControl');
var renderControl = require('../middleware/render/renderControl');
var renderControlList = require('../middleware/render/renderControlList');

var updateEdges = require('../middleware/edge/updateEdges');
var getEdgesForPointList = require('../middleware/edge/getEdgesForPointList');
var deleteEdges = require('../middleware/edge/deleteEdges');
var validateNeighbors = require('../middleware/utils/validateNeighbors');
var unifyPointNames = require('../middleware/utils/unifyPointNames');

var Control = require('../models/control');

router.get('/maps/:mapId/controls',
    getControlList,
    unifyPointNames,
    getEdgesForPointList,
    renderControlList
);

router.post('/maps/:mapId/controls',
    validateControl,
    validateNeighbors,
    createControl,
    updateEdges,
    renderControl
);

router.put('/controls/:controlId',
    validateControl,
    validateNeighbors,
    updateControl,
    updateEdges,
    renderControl
);

router.delete('/controls/:controlId', 
    getControl,
    deleteControl,
    deleteEdges
);

module.exports = router;
