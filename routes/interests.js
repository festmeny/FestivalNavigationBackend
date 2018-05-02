var express = require('express');
var router = express.Router();

var getInterest = require('../middleware/interests/getInterest');
var getInterestList = require('../middleware/interests/getInterestList');
var createInterest = require('../middleware/interests/createInterest');
var updateInterest = require('../middleware/interests/updateInterest');
var deleteInterest = require('../middleware/interests/deleteInterest');
var validateInterest = require('../middleware/interests/validateInterest');
var renderInterest = require('../middleware/render/renderInterest');
var renderInterestList = require('../middleware/render/renderInterestList');

var updateEdges = require('../middleware/edge/updateEdges');
var getEdgesForPointList = require('../middleware/edge/getEdgesForPointList');
var deleteEdges = require('../middleware/edge/deleteEdges');
var getType = require('../middleware/utils/getType');
var validateNeighbors = require('../middleware/utils/validateNeighbors');
var unifyPointNames = require('../middleware/utils/unifyPointNames');

router.get('/maps/:mapId/interests',
    getType,
    getInterestList,
    unifyPointNames,
    getEdgesForPointList,
    renderInterestList
);

router.post('/maps/:mapId/interests',
    validateInterest,
    validateNeighbors,
    getType,
    createInterest,
    updateEdges,
    renderInterest
);

router.put('/interests/:interestId', 
    validateInterest,
    validateNeighbors,
    getType,
    updateInterest,
    updateEdges,
    renderInterest
);

router.delete('/interests/:interestId',
    getInterest,
    deleteInterest,
    deleteEdges
);

module.exports = router;
